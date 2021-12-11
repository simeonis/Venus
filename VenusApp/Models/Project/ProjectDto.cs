// *****************************************
// Creator: Shane Guther
// 
// Description:
// Models a Project Data transfer object to get a project from the client side
// *****************************************
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace venus.Models
{
    public class ProjectDto
    {
        /// <summary>
        /// Title of the Project
        /// </summary>
        public string Title { get; set; }
        /// <summary>
        /// Description of the Project
        /// </summary>
        public string Description { get; set; }
        /// <summary>
        /// Project color
        /// </summary>
        public string Color { get; set; }
        /// <summary>
        /// List of bugs for the Project
        /// </summary>
        public List<Bug> Bugs { get; set; }
        /// <summary>
        /// List of project users
        /// </summary>
        public List<ApplicationUser> UserList { get; set; }

    }
    
}
