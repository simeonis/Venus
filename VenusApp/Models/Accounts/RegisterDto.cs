namespace venus.Models
{
    public class RegisterDto
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PasswordConfirm { get; set; }

        public bool Dev { get; set; }

        public string Specialization { get; set; }

        public string Platform { get; set; }
    }
}