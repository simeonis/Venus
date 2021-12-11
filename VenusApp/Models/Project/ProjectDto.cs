using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace venus.Models
{
    public class ProjectDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Color { get; set; }
        public List<Bug> Bugs { get; set; }
        public List<ApplicationUser> UserList { get; set; }

    }
    
}
