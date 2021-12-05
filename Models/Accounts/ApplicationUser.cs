using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace venus.Models
{
    public class ApplicationUser : IdentityUser
    {
        public List<Project> Projects { get; set; }
    }
}