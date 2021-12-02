using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public enum Status { Completed, InProgress, Assigned, Unassigned }
public enum Severity { High, Medium, Low }

namespace venus.Models
{
    public class Bug
    {
        public Guid ID { get; set; }
        public string Title { get; set; }
        public string Details { get; set; }
        public Severity Severity { get; set; } = Severity.Medium;
        public string Category { get; set; } = "";
        public string Status { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;

        public Bug(string title, string details, Status status)
        {
            this.ID = Guid.NewGuid();
            this.Title = title;
            this.Details = details;
            this.Status = status.ToString();
        }
    }
}
