using EmployeeManagement.DTOs;
using EmployeeManagement.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace EmployeeManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly DBHelper _dbHelper;
        private readonly IConfiguration _configuration;

        public AuthController(
            DBHelper dbHelper,
            IConfiguration configuration)
        {
            _dbHelper = dbHelper;
            _configuration = configuration;
        }

        [HttpPost("Register")]
        public IActionResult Register(RegisterDTO model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                // Duplicate Email Check

                SqlParameter[] checkParams =
                {
            new SqlParameter("@Module","USER"),
            new SqlParameter("@Action","LOGIN"),
            new SqlParameter("@Email",model.Email)
        };

                DataTable checkDt =
                    _dbHelper.ExecuteSP(
                        "USP_Master",
                        checkParams
                    );

                if (checkDt.Rows.Count > 0)
                {
                    return BadRequest(new
                    {
                        Success = false,
                        Message = "Email Already Exists"
                    });
                }

                SqlParameter[] parameters =
                {
            new SqlParameter("@Module","USER"),
            new SqlParameter("@Action","REGISTER"),
            new SqlParameter("@UserName",model.UserName),
            new SqlParameter("@Email",model.Email),
            new SqlParameter("@PasswordHash",model.Password),
            new SqlParameter("@RoleName",model.RoleName)
        };

                _dbHelper.ExecuteSP("USP_Master", parameters);

                return Ok(new
                {
                    Success = true,
                    Message = "User Registered Successfully"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("Login")]
        public IActionResult Login(LoginDTO model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                SqlParameter[] parameters =
                {
                    new SqlParameter("@Module","USER"),
                    new SqlParameter("@Action","LOGIN"),
                    new SqlParameter("@Email",model.Email)
                };

                DataTable dt =
                    _dbHelper.ExecuteSP(
                        "USP_Master",
                        parameters
                    );

                if (dt.Rows.Count == 0)
                {
                    return Unauthorized("Invalid Email");
                }

                string dbPassword =
                    dt.Rows[0]["PasswordHash"]
                    .ToString()!;

                if (dbPassword != model.Password)
                {
                    return Unauthorized("Invalid Password");
                }

                string role =
                    dt.Rows[0]["RoleName"]
                    .ToString()!;

                string token =
                    GenerateToken(
                        model.Email!,
                        role
                    );

                return Ok(new
                {
                    Success = true,
                    Message = "Login Successful",
                    Token = token,
                    RoleName = role
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        private string GenerateToken(
            string email,
            string role)
        {
            var key =
                new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(
                        _configuration["Jwt:Key"]!
                    ));

            var credentials =
                new SigningCredentials(
                    key,
                    SecurityAlgorithms.HmacSha256
                );

            var claims = new[]
            {
                new Claim(
                    ClaimTypes.Email,
                    email
                ),

                new Claim(
                    ClaimTypes.Role,
                    role
                )
            };

            var token =
                new JwtSecurityToken(
                    issuer:
                        _configuration["Jwt:Issuer"],

                    audience:
                        _configuration["Jwt:Audience"],

                    claims:
                        claims,

                    expires:
                        DateTime.Now.AddHours(2),

                    signingCredentials:
                        credentials
                );

            return new JwtSecurityTokenHandler()
                .WriteToken(token);
        }
    }
}