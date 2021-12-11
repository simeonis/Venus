using System;

namespace venus.Models
{
    public class UserToProjDto
    {
        public Guid ProjId { get; set; }
        public string UserEmail { get; set; }

        public UserToProjDto(Guid projId, string userEmail)
        {
            ProjId = projId;
            UserEmail = userEmail;
        }
    }
}