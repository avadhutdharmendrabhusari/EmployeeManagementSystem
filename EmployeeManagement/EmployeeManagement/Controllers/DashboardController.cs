
using EmployeeManagement.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;

namespace EmployeeManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DashboardController : ControllerBase
    {
        private readonly DBHelper _dbHelper;

        public DashboardController(DBHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        [HttpGet("GetDashboard")]
        public IActionResult GetDashboard()
        {
            try
            {
                SqlParameter[] parameters =
                {
                    new SqlParameter("@Module","DASHBOARD"),
                    new SqlParameter("@Action","COUNT")
                };

                DataTable dt =
                    _dbHelper.ExecuteSP("USP_Master", parameters);

                if (dt.Rows.Count == 0)
                {
                    return NotFound();
                }

                return Ok(new
                {
                    TotalEmployees = dt.Rows[0]["TotalEmployees"],
                    ActiveEmployees = dt.Rows[0]["ActiveEmployees"],
                    InactiveEmployees = dt.Rows[0]["InactiveEmployees"],
                    TotalDepartments = dt.Rows[0]["TotalDepartments"]
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("DepartmentChart")]
        public IActionResult DepartmentChart()
        {
            SqlParameter[] parameters =
            {
        new SqlParameter("@Module","DASHBOARD"),
        new SqlParameter("@Action","DEPARTMENTCHART")
    };

            DataTable dt =
                _dbHelper.ExecuteSP("USP_Master", parameters);

            var result = new List<object>();

            foreach (DataRow row in dt.Rows)
            {
                result.Add(new
                {
                    DepartmentName = row["DepartmentName"],
                    EmployeeCount = row["EmployeeCount"]
                });
            }

            return Ok(result);
        }

        [HttpGet("RecentEmployees")]
        public IActionResult RecentEmployees()
        {
            SqlParameter[] parameters =
            {
        new SqlParameter("@Module","DASHBOARD"),
        new SqlParameter("@Action","RECENTEMPLOYEES")
    };

            DataTable dt =
                _dbHelper.ExecuteSP("USP_Master", parameters);

            var result = new List<object>();

            foreach (DataRow row in dt.Rows)
            {
                result.Add(new
                {
                    EmployeeId = row["EmployeeId"],
                    EmployeeName = row["EmployeeName"],
                    DepartmentName = row["DepartmentName"],
                    Designation = row["Designation"],
                    CreatedDate = row["CreatedDate"]
                });
            }

            return Ok(result);
        }
    }
    }

