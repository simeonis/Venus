// *****************************************
// Creator: Shane Guther
// 
// Description:
// Models a Project created by a user
// *****************************************

using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace venus.Models
{
    /// <summary>
    /// Enum to convert project color
    /// </summary>
    public enum ProjectColor
    {
        Red,
        Blue,
        Green,
        Yellow,
        Orange,
        Purple,
    }
    public class Project
    {
        /// <summary>
        /// ID unique to each Project
        /// </summary>
        public Guid ID { get; set; }
        /// <summary>
        /// Title of Project
        /// </summary>
        public string Title { get; set; }
        /// <summary>
        /// Description of Project
        /// </summary>
        public string Description { get; set; }
        /// <summary>
        /// List of bugs for each project
        /// </summary>
        public List<Bug> Bugs { get; set; }
        /// <summary>
        /// Color of each projects
        /// </summary>
        public string Color { get; set; }
        /// <summary>
        /// OwnerID is set to the creator of the project
        /// </summary>
        public Guid OwnerID { get; set; }
        /// <summary>
        /// List of Users that the project owner can access
        /// </summary>
        public List<ApplicationUser> UsersList { get; set; }

       
        /// <summary>
        /// Constructor to set default values of project fields
        /// </summary>
        public Project()
        {
            this.ID = Guid.NewGuid();
            this.Title = "";
            this.Description = "";
            this.Bugs = new List<Bug>();
            this.UsersList = new List<ApplicationUser>();
            this.Color = ProjectColor.Green.ToString();
            OwnerID = Guid.Empty;
        }

        /// <summary>
        /// Project Constructor with parameters, used in unit testing
        /// </summary>
        public Project(string title, string description, string color, Guid ownerId)
        {
            ID = Guid.NewGuid();
            Title = title;
            Description = description;
            Color = color;
            OwnerID = ownerId;
            Bugs = new List<Bug>();
        }
    }
}
