using System;
using System.Collections.Generic;
using System.Linq;
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

        public List<ApplicationUser> UsersList { get; set; }

       
        public Project()
        {
            this.ID = Guid.NewGuid();
            this.Title = "";
            this.Description = "";
            this.Bugs = new List<Bug>();
            this.UsersList = new List<ApplicationUser>();
            this.Color = ProjectColor.Green.ToString();
        }

        public Project(ProjectDto projectDto)
        {
            ID = Guid.NewGuid();
            Title = projectDto.Title;
            Description = projectDto.Description;
            Color = projectDto.Color;

        }
    }
}
