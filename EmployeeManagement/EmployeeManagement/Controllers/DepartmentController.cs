using EmployeeManagement.Models;
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
    public class DepartmentController : ControllerBase
    {
        private readonly DBHelper _dbHelper;

        public DepartmentController(DBHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        // =========================
        // ADD DEPARTMENT
        // =========================

        [HttpPost("Add")]
        public IActionResult Add(Department model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                SqlParameter[] parameters =
                {
                    new SqlParameter("@Module","DEPARTMENT"),
                    new SqlParameter("@Action","INSERT"),
                    new SqlParameter("@DepartmentName",model.DepartmentName),
                    new SqlParameter("@Description",model.Description),
                    new SqlParameter("@Status",model.Status)
                };

                _dbHelper.ExecuteSP("USP_Master", parameters);

                return Ok(new
                {
                    success = true,
                    message = "Department Added Successfully"
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

        // =========================
        // GET ALL DEPARTMENTS
        // =========================

        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            try
            {
                SqlParameter[] parameters =
                {
                    new SqlParameter("@Module","DEPARTMENT"),
                    new SqlParameter("@Action","GETALL")
                };

                DataTable dt =
                    _dbHelper.ExecuteSP(
                        "USP_Master",
                        parameters
                    );

                var result =
                    new List<object>();

                foreach (DataRow row in dt.Rows)
                {
                    result.Add(new
                    {
                        DepartmentId =
                            Convert.ToInt32(
                                row["DepartmentId"]
                            ),

                        DepartmentName =
                            row["DepartmentName"]
                            .ToString(),

                        Description =
                            row["Description"]
                            .ToString(),

                        Status =
                            Convert.ToBoolean(
                                row["Status"]
                            )
                    });
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    error = ex.ToString()
                });
            }
        }

        // =========================
        // GET DEPARTMENT BY ID
        // =========================

        [HttpGet("GetById/{id}")]
        public IActionResult GetById(int id)
        {
            try
            {
                SqlParameter[] parameters =
                {
                    new SqlParameter("@Module","DEPARTMENT"),
                    new SqlParameter("@Action","GETBYID"),
                    new SqlParameter("@DepartmentId",id)
                };

                DataTable dt =
                    _dbHelper.ExecuteSP(
                        "USP_Master",
                        parameters
                    );

                if (dt.Rows.Count == 0)
                {
                    return NotFound(
                        "Department Not Found"
                    );
                }

                return Ok(new
                {
                    DepartmentId =
                        dt.Rows[0]["DepartmentId"],

                    DepartmentName =
                        dt.Rows[0]["DepartmentName"],

                    Description =
                        dt.Rows[0]["Description"],

                    Status =
                        dt.Rows[0]["Status"]
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

        // =========================
        // UPDATE DEPARTMENT
        // =========================

        [HttpPut("Update")]
        public IActionResult Update(Department model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                SqlParameter[] parameters =
                {
                    new SqlParameter("@Module","DEPARTMENT"),
                    new SqlParameter("@Action","UPDATE"),
                    new SqlParameter("@DepartmentId",model.DepartmentId),
                    new SqlParameter("@DepartmentName",model.DepartmentName),
                    new SqlParameter("@Description",model.Description),
                    new SqlParameter("@Status",model.Status)
                };

                _dbHelper.ExecuteSP(
                    "USP_Master",
                    parameters
                );

                return Ok(new
                {
                    success = true,
                    message =
                        "Department Updated Successfully"
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

        // =========================
        // DELETE DEPARTMENT
        // =========================

        [HttpDelete("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                SqlParameter[] parameters =
                {
                    new SqlParameter("@Module","DEPARTMENT"),
                    new SqlParameter("@Action","DELETE"),
                    new SqlParameter("@DepartmentId",id)
                };

                _dbHelper.ExecuteSP(
                    "USP_Master",
                    parameters
                );

                return Ok(new
                {
                    success = true,
                    message =
                        "Department Deleted Successfully"
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
    }
}