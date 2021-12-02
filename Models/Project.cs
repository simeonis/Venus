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
        //public string Color { get; set; }
        
        //Bug model not created yet
        //public List<Bug> BugsList { get; set; }

        public Project(string title, string description)
        {
            this.ID = Guid.NewGuid();
            this.Title = title;
            this.Description = description;
            //this.Color = color.ToString();
        }
    }
}
