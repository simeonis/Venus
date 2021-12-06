using System;

public enum BugSeverity { High, Medium, Low }
public enum BugCategory { Functional, Performance, Usability, Compatibility, Security, None }
public enum BugStatus { Completed, InProgress, NotStarted }
public enum BugAssignee { Assigned }

namespace venus.Models
{
    public class Bug
    {
        public Guid ID { get; set; }
        public string Category { get; set; }
        public string Subject { get; set; }
        public string Creator { get; set; }
        public string Severity { get; set; }
        public string Status { get; set; }
        public string Assignee { get; set; }
        public DateTime Date { get; set; }
        public Guid ProjectID { get; set; }


        public Bug()
        {
            ID = Guid.NewGuid();
            Category = BugCategory.None.ToString();
            Subject = "";
            Creator = "";
            Severity = BugSeverity.Medium.ToString();
            Status = BugStatus.NotStarted.ToString();
            Assignee = BugAssignee.Assigned.ToString();
            Date = DateTime.Now;
            ProjectID = Guid.NewGuid();
        }

        public Bug(BugDto bugDto)
        {
            ID = Guid.NewGuid();
            Category = bugDto.Category;
            Subject = bugDto.Subject;
            Creator = bugDto.Creator;
            Severity = bugDto.Severity;
            Status = bugDto.Status;
            Assignee = bugDto.Assignee;
            Date = bugDto.Date;
            ProjectID = bugDto.ProjectID;
        }
    }
}
