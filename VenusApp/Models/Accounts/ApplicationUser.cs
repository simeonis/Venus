// *****************************************
// Creator: Seth CLimenhaga
// 
// Description:
// User model that contains a user
// *****************************************

using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace venus.Models
{

    public class ApplicationUser : IdentityUser
    {
        //List of projects a user is in
        public List<Project> Projects { get; set; }
    }
}