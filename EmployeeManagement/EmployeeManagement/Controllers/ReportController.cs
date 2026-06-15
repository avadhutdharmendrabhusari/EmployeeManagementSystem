
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
    public class ReportController : ControllerBase
    {
        private readonly DBHelper _dbHelper;

        public ReportController(DBHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        [HttpGet("DepartmentWise")]
        public IActionResult DepartmentWise()
        {
            try
            {
                SqlParameter[] parameters =
                {
                    new SqlParameter("@Module","REPORT"),
                    new SqlParameter("@Action","DEPARTMENTWISE")
                };

                DataTable dt =
                    _dbHelper.ExecuteSP("USP_Master", parameters);

                var result = new List<object>();

                foreach (DataRow row in dt.Rows)
                {
                    result.Add(new
                    {
                        DepartmentName = row["DepartmentName"],
                        EmployeeCode = row["EmployeeCode"],
                        EmployeeName = row["EmployeeName"],
                        Designation = row["Designation"],
                        Email = row["Email"],
                        MobileNo = row["MobileNo"],
                        EmployeeStatus = row["EmployeeStatus"]
                    });
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

