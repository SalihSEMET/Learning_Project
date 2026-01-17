using System.ComponentModel.DataAnnotations;

namespace TechMarket.Business.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [Compare("Password")]
        public string Password { get; set; }
        [Phone]
        public string PhoneNumber { get; set; }

    }
}