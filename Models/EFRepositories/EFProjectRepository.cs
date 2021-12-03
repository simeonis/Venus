using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace venus.Models.EFRepositories
{
    public class EFProjectRepository : IProjectRepository
    {
        public static List<Project> projectList = new List<Project> { new Project("Project 1", "Description1"), new Project("Project 2", "Description 2")};

        public ApplicationUser AddUserToProject(Guid projId, ApplicationUser appUser)
        {
            var project = projectList.Find(proj => proj.ID == projId);

            if (project == null || project.UsersList.All(u => u.Id == appUser.Id))
                return null;
            
            project.UsersList.Add(appUser);

            return appUser;
        }
    }
}
