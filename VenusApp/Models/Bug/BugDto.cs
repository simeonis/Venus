// *****************************************
// Creator: Shae Simeoni
// 
// Description:
// Bug Data Transfer Object, used to send Bugs accross the internet.
// Useful for a client when they create a bug without having a GUID.
// *****************************************

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace venus.Models
{
    public class BugDto
    {
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
    }
}
