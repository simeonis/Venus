// *****************************************
// Creator: Seth CLimenhaga
// 
// Description:
// Transfers data representing a user back 
// to the client
// *****************************************

using System.Collections.Generic;
namespace venus.Models
{
    public class UserDto
    {
        public string UserName { get; set;}
        public string Email { get; set;}
        
        public List<Project> Projects { get; set; }
        public string id { get; set; }
    }
}
