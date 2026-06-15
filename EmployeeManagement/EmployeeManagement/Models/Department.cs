using System.ComponentModel.DataAnnotations;

namespace EmployeeManagement.Models
{
    public class Department
    {
        public int DepartmentId { get; set; }

        [Required(ErrorMessage = "Department Name is required")]
        [MinLength(3, ErrorMessage = "Department Name must be at least 3 characters")]
        [MaxLength(100, ErrorMessage = "Department Name cannot exceed 100 characters")]
        public string? DepartmentName { get; set; }

        [Required(ErrorMessage = "Description is required")]
        [MinLength(5, ErrorMessage = "Description must be at least 5 characters")]
        [MaxLength(500, ErrorMessage = "Description cannot exceed 500 characters")]
        public string? Description { get; set; }

        public bool Status { get; set; }
    }
}