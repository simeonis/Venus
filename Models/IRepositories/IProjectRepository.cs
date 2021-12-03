using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace venus.Models
{
    interface IProjectRepository
    {
        ApplicationUser AddUserToProject(Guid projId, ApplicationUser appUser);
    }
}
