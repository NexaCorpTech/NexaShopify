using System.ComponentModel.DataAnnotations;

namespace NexaShopify.API.Models.Authentication
{
    public class LoginViewModel
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        public bool RememberMe { get; set; } = false;
    }
}
