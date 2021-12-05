using System.Collections.Generic;
namespace venus.Models
{
    public class UserDto
    {
        public string Name { get; set;}
        public string Email { get; set;}
        
        public List<Project> Projects { get; set; }
    }
}
