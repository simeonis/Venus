using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace venus.Models
{
    public class BugDto
    {
        public string Title { get; set; }
        public string Category { get; set; }
        public string Subject { get; set; }
        public string Creator { get; set; }
        public string Severity { get; set; }
        public string Status { get; set; }
        public string Assignee { get; set; }
        public DateTime Date { get; set; }
    }
}
