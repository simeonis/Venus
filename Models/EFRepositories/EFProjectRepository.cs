using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using venus.Models.IRepositories;

namespace venus.Models.EFRepositories
{
    public class EFProjectRepository : IProjectRepository
    {
        private readonly VenusDbContext dbContext;
        
        public EFProjectRepository(VenusDbContext ctx)
        {
            dbContext = ctx;
        }
        
        public IEnumerable<Project> Projects => dbContext.Projects.Include(p => p.UsersList)
                                                                  .Include(p => p.Bugs);

        public Project GetProject(Guid id)
        {
            Console.WriteLine(id);
            
            return Projects.First(p => p.ID == id);
        }

        public IEnumerable<Project> GetProjects(string id)
        {
            var p = Projects.Where(project =>
                project.UsersList.Any(user =>
                    user.Id == id)).ToList();
            
            return p;
        }

        public Project AddProject(Project project)
        {
            // project = new Project(project);
            if(!dbContext.Projects.Where(p => p.ID.Equals(project.ID)).Any())
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
        
        public void Save()
        {
            dbContext.SaveChanges();
        }

    }
}
