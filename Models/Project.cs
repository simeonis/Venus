using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace venus.Models
{
    public enum Colors
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
        //public string Color { get; private set; }

        public List<ApplicationUser> UsersList { get; set; }

        public Project(string title, string description //, Colors color
        )
        {
            this.ID = Guid.NewGuid();
            this.Title = title;
            this.Description = description;
            this.Bugs = new List<Bug>();
            // this.Color = color.ToString();
        }

        public Project(){}

        // public void setColor(Colors color)
        // {
        //     this.Color = color.ToString();
        // }
    }
}
