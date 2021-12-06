using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace venus.Models
{
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
        public Guid ID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public List<Bug> Bugs { get; set; }
        public string Color { get; set; }

        public Guid OwnerID { get; set; }
        public List<ApplicationUser> UsersList { get; set; }

       
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

        public Project(string title, string description, string color, Guid ownerId)
        {
            ID = Guid.NewGuid();
            Title = title;
            Description = description;
            Color = color;
            OwnerID = ownerId;
        }
    }
}
