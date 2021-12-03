using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace venus.Models.EFRepositories
{
    public class EFProjectRepository : IProjectRepository
    {
        private VenusDbContext dbContext;
        
        public EFProjectRepository(VenusDbContext ctx)
        {
            dbContext = ctx;
        }
        
        public IEnumerable<Project> Projects => dbContext.Projects;

        //not sure if this works
        public IEnumerable<Bug> Bugs => dbContext.Projects.FirstOrDefault().Bugs;

        public Project GetProject(Guid id)
        {
            return dbContext.Projects.FirstOrDefault(p => p.ID == id);
        }

        public IEnumerable<Project> GetProjects()
        {
            return dbContext.Projects.ToList();
        }

        public Project AddProject(Project project)
        {
            if(!dbContext.Projects.Where(p => p == project).Any())
            {
                var res = dbContext.Projects.Add(project);
                dbContext.SaveChanges();
                return res.Entity;
            }
            return null;
        }

        public Project UpdateProject(Project project)
        {
            dbContext.Projects.Update(project);
            dbContext.SaveChanges();
            return project;
        }

        public void DeleteProject(Guid id)
        {
            Project project = dbContext.Projects.FirstOrDefault(p => p.ID == id);
            dbContext.Projects.Remove(project);
            dbContext.SaveChanges();
        }

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
