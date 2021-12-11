// *****************************************
// Creator: Shae Simeoni
// 
// Description:
// Models a Bug that a User can create
// *****************************************

using System;

public enum BugSeverity { High, Medium, Low }
public enum BugCategory { Functional, Performance, Usability, Compatibility, Security, None }
public enum BugStatus { Completed, InProgress, NotStarted }

namespace venus.Models
{
    public class Bug
    {
        /// <summary>
        /// The bug's unique identifier
        /// </summary>
        public Guid ID { get; set; }
        /// <summary>
        /// The bug's category, used to classify the bug
        /// </summary>
        public string Category { get; set; }
        /// <summary>
        /// The bug's subject
        /// </summary>
        public string Subject { get; set; }
        /// <summary>
        /// The creator of the bug
        /// </summary>
        public string Creator { get; set; }
        /// <summary>
        /// The severity of the bug defines it's urgency
        /// </summary>
        public string Severity { get; set; }
        /// <summary>
        /// The bug's completion status
        /// </summary>
        public string Status { get; set; }
        /// <summary>
        /// The bug's creation date
        /// </summary>
        public DateTime Date { get; set; }
        /// <summary>
        /// The identification of the project a bug belongs to
        /// </summary>
        public Guid ProjectID { get; set; }

        public Bug()
        {
            ID = Guid.NewGuid();
            Category = BugCategory.None.ToString();
            Subject = "";
            Creator = "";
            Severity = BugSeverity.Medium.ToString();
            Status = BugStatus.NotStarted.ToString();
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
            Date = bugDto.Date;
            ProjectID = bugDto.ProjectID;
        }
    }
}
