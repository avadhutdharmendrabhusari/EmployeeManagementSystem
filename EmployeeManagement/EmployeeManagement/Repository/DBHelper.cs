using Microsoft.Data.SqlClient;
using System.Data;

namespace EmployeeManagement.Repository
{
    public class DBHelper
    {
        private readonly IConfiguration _configuration;

        public DBHelper(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public DataTable ExecuteSP(string spName, SqlParameter[] parameters)
        {
            DataTable dt = new DataTable();

            using (SqlConnection con = new SqlConnection(
                _configuration.GetConnectionString("DefaultConnection")))
            {
                using (SqlCommand cmd = new SqlCommand(spName, con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    if (parameters != null)
                        cmd.Parameters.AddRange(parameters);

                    SqlDataAdapter da = new SqlDataAdapter(cmd);

                    da.Fill(dt);
                }
            }

            return dt;
        }
    }
}