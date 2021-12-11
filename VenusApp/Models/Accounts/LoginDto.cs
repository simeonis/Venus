// *****************************************
// Creator: Seth CLimenhaga
// 
// Description:
// Transfers data to the server to login the user
// *****************************************
namespace venus.Models
{
    public class LoginDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}