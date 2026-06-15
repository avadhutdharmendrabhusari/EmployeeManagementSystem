
using EmployeeManagement.Models;
using EmployeeManagement.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;
using System.Security.Claims;

namespace EmployeeManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EmployeeController : ControllerBase
    {
        private readonly DBHelper _dbHelper;

        public EmployeeController(DBHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        [HttpPost("Add")]
        public IActionResult Add(Employee model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                SqlParameter[] parameters =
                {
            new SqlParameter("@Module","EMPLOYEE"),
            new SqlParameter("@Action","INSERT"),
            new SqlParameter("@EmployeeCode",model.EmployeeCode),
            new SqlParameter("@EmployeeName",model.EmployeeName),
            new SqlParameter("@DepartmentId",model.DepartmentId),
            new SqlParameter("@Designation",model.Designation),
            new SqlParameter("@Email",model.Email),
            new SqlParameter("@MobileNo",model.MobileNo),
            new SqlParameter("@JoiningDate",model.JoiningDate)
        };

                _dbHelper.ExecuteSP("USP_Master", parameters);

                return Ok(new
                {
                    success = true,
                    message = "Employee Added Successfully"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    error = ex.ToString()
                });
            }
        }

        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            SqlParameter[] parameters =
            {
                new SqlParameter("@Module","EMPLOYEE"),
                new SqlParameter("@Action","GETALL")
            };

            DataTable dt =
                _dbHelper.ExecuteSP("USP_Master", parameters);

            var result = new List<object>();

            foreach (DataRow row in dt.Rows)
            {
                result.Add(new
                {
                    EmployeeId = row["EmployeeId"],
                    EmployeeCode = row["EmployeeCode"],
                    EmployeeName = row["EmployeeName"],
                    DepartmentName = row["DepartmentName"],
                    Designation = row["Designation"],
                    Email = row["Email"],
                    MobileNo = row["MobileNo"],
                    JoiningDate = row["JoiningDate"],
                    Status = row["Status"]
                });
            }

            return Ok(result);
        }

        [HttpGet("GetById/{id}")]
        public IActionResult GetById(int id)
        {
            SqlParameter[] parameters =
            {
                new SqlParameter("@Module","EMPLOYEE"),
                new SqlParameter("@Action","GETBYID"),
                new SqlParameter("@EmployeeId",id)
            };

            DataTable dt =
                _dbHelper.ExecuteSP("USP_Master", parameters);

            if (dt.Rows.Count == 0)
            {
                return NotFound("Employee Not Found");
            }

            return Ok(new
            {
                EmployeeId = dt.Rows[0]["EmployeeId"],

                EmployeeCode = dt.Rows[0]["EmployeeCode"],

                EmployeeName = dt.Rows[0]["EmployeeName"],

                DepartmentId = dt.Rows[0]["DepartmentId"],

                Designation = dt.Rows[0]["Designation"],

                Email = dt.Rows[0]["Email"],

                MobileNo = dt.Rows[0]["MobileNo"],

                JoiningDate = dt.Rows[0]["JoiningDate"],

                Status = dt.Rows[0]["Status"]
            });
        }

        [HttpPut("Update")]
        public IActionResult Update(Employee model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                SqlParameter[] parameters =
                {
            new SqlParameter("@Module","EMPLOYEE"),
            new SqlParameter("@Action","UPDATE"),
            new SqlParameter("@EmployeeId",model.EmployeeId),
            new SqlParameter("@EmployeeCode",model.EmployeeCode),
            new SqlParameter("@EmployeeName",model.EmployeeName),
            new SqlParameter("@DepartmentId",model.DepartmentId),
            new SqlParameter("@Designation",model.Designation),
            new SqlParameter("@Email",model.Email),
            new SqlParameter("@MobileNo",model.MobileNo),
            new SqlParameter("@JoiningDate",model.JoiningDate),
            new SqlParameter("@Status",model.Status)
        };

                _dbHelper.ExecuteSP("USP_Master", parameters);

                return Ok(new
                {
                    success = true,
                    message = "Employee Updated Successfully"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpDelete("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            SqlParameter[] parameters =
            {
                new SqlParameter("@Module","EMPLOYEE"),
                new SqlParameter("@Action","DELETE"),
                new SqlParameter("@EmployeeId",id)
            };

            _dbHelper.ExecuteSP("USP_Master", parameters);

            return Ok(new
            {
                success = true,
                message = "Employee Deleted Successfully"
            });
        }

        [HttpGet("MyProfile")]
        [Authorize]

        public IActionResult MyProfile()
        {
            try
            {
                var email =
                    User.FindFirst(ClaimTypes.Email)?.Value;

                SqlParameter[] parameters =
                {
            new SqlParameter("@Module","EMPLOYEE"),
            new SqlParameter("@Action","MYPROFILE"),
            new SqlParameter("@Email",email)
        };

                DataTable dt =
                    _dbHelper.ExecuteSP(
                        "USP_Master",
                        parameters
                    );

                if (dt.Rows.Count == 0)
                {
                    return NotFound();
                }

                return Ok(new
                {
                    EmployeeCode =
                        dt.Rows[0]["EmployeeCode"],

                    EmployeeName =
                        dt.Rows[0]["EmployeeName"],

                    DepartmentName =
    dt.Rows[0]["DepartmentName"],

                    Designation =
                        dt.Rows[0]["Designation"],

                    Email =
                        dt.Rows[0]["Email"],

                    MobileNo =
                        dt.Rows[0]["MobileNo"],

                    JoiningDate =
                        dt.Rows[0]["JoiningDate"],

                    Status =
                        dt.Rows[0]["Status"]
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

