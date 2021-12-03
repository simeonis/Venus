using System;

public enum BugSeverity { High, Medium, Low }
public enum BugCategory { Functional, Performance, Usability, Compatibility, Security, None }
public enum BugStatus { Completed, InProgress, Assigned, Unassigned }

namespace venus.Models
{
    public class Bug
    {
        public Guid ID { get; set; }
        public string Title { get; set; }
        public string Details { get; set; }
        public string Severity { get; set; }
        public string Category { get; set; }
        public string Status { get; set; }
        public DateTime Date { get; set; }

        public Bug()
        {
            ID = Guid.NewGuid();
            Title = "";
            Details = "";
            Severity = BugSeverity.Medium.ToString();
            Category = BugCategory.None.ToString();
            Status = BugStatus.Unassigned.ToString();
            Date = DateTime.Now;
        }

        public Bug(BugDto bugDto)
        {
            ID = Guid.NewGuid();
            Title = bugDto.Title;
            Details = bugDto.Details;
            Severity = bugDto.Severity;
            Category = bugDto.Category;
            Status = bugDto.Status;
            Date = bugDto.Date;
        }
    }
}
