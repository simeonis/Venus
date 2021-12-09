using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using venus.Models.IRepositories;

namespace venus.Models.EFRepositories
{
    public class EFBugRepository : IBugRepository
    {
        private VenusDbContext context;
        private IEnumerable<Project> projects;

        public EFBugRepository(VenusDbContext context)
        {
            this.context = context;
            projects = context.Projects.Include(p => p.Bugs);
        }

        public Bug GetBug(Guid bugID)
        {
            return context.Bugs.FirstOrDefault(b => b.ID.Equals(bugID));
        }

        public IEnumerable<Bug> GetBugs(Guid projectID)
        {
            return context.Bugs.Where(b => b.ProjectID == projectID).ToList();
        }

        public IEnumerable<Bug> GetBugs()
        {
            return context.Bugs.ToList();
        }

        public Bug AddBug(BugDto bugDto)
        {
            Bug bug = new Bug(bugDto);

            // Unique ID
            if (!context.Bugs.Where(b => b.ID.Equals(bug.ID)).Any())
            {
                var result = context.Bugs.Add(bug);
                context.SaveChanges();
                return result.Entity;
            }

            // ID already exist
            return null;
        }

        public bool DeleteBug(Guid bugID)
        {
            var bugs = context.Bugs.Where(b => b.ID.Equals(bugID));
            if (bugs.Any())
            {
                context.Bugs.Remove(bugs.First());
                context.SaveChanges();
                return true;
            }
            
            return false;
        }

        public void Save()
        {
            context.SaveChanges();
        }
    }
}
