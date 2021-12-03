using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        public void Save()
        {
            dbContext.SaveChanges();
        }

    }
}
