using System.ComponentModel.DataAnnotations;

namespace EmployeeManagement.Models
{
    public class Employee
    {
        public int EmployeeId { get; set; }

        [Required(ErrorMessage = "Employee Code is required")]
        [MaxLength(20, ErrorMessage = "Employee Code cannot exceed 20 characters")]
        public string? EmployeeCode { get; set; }

        [Required(ErrorMessage = "Employee Name is required")]
        [MinLength(3, ErrorMessage = "Employee Name must be at least 3 characters")]
        [MaxLength(100, ErrorMessage = "Employee Name cannot exceed 100 characters")]
        public string? EmployeeName { get; set; }

        [Required(ErrorMessage = "Department is required")]
        [Range(1, int.MaxValue, ErrorMessage = "Please select a valid department")]
        public int DepartmentId { get; set; }

        [Required(ErrorMessage = "Designation is required")]
        [MinLength(2, ErrorMessage = "Designation must be at least 2 characters")]
        [MaxLength(100, ErrorMessage = "Designation cannot exceed 100 characters")]
        public string? Designation { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Enter valid email address")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Mobile Number is required")]
        [RegularExpression(@"^[0-9]{10}$",
            ErrorMessage = "Mobile Number must be exactly 10 digits")]
        public string? MobileNo { get; set; }

        [Required(ErrorMessage = "Joining Date is required")]
        public DateTime JoiningDate { get; set; }

        public bool Status { get; set; }
    }
}