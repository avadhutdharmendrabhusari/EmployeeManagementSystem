using System.ComponentModel.DataAnnotations;

namespace EmployeeManagement.Models
{
    public class User
    {
        public int UserId { get; set; }

        [Required(ErrorMessage = "User Name is required")]
        [MinLength(3, ErrorMessage = "User Name must be at least 3 characters")]
        [MaxLength(100, ErrorMessage = "User Name cannot exceed 100 characters")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Enter valid email address")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [MinLength(8, ErrorMessage = "Password must be minimum 8 characters")]
        [MaxLength(50, ErrorMessage = "Password cannot exceed 50 characters")]
        public string PasswordHash { get; set; }

        [Required(ErrorMessage = "Role is required")]
        [RegularExpression("^(Admin|User)$",
            ErrorMessage = "Role must be Admin or User")]
        public string RoleName { get; set; }

        public bool Status { get; set; }
    }
}