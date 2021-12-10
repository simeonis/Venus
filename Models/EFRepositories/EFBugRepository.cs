using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using venus.Models.IRepositories;

namespace venus.Models.EFRepositories
{
    public class EFBugRepository : IBugRepository
    {
        private readonly VenusDbContext _context;

        public EFBugRepository(VenusDbContext context)
        {
            this._context = context;
        }

        public Bug GetBug(Guid bugID)
        {
            return _context.Bugs.FirstOrDefault(b => b.ID.Equals(bugID));
        }

        public IEnumerable<Bug> GetBugs(Guid projectID)
        {
            return _context.Bugs.Where(b => b.ProjectID == projectID).ToList();
        }

        public IEnumerable<Bug> GetBugs()
        {
            return _context.Bugs.ToList();
        }

        public Bug AddBug(BugDto bugDto)
        {
            Bug bug = new Bug(bugDto);

            // Unique ID
            if (!_context.Bugs.Where(b => b.ID.Equals(bug.ID)).Any())
            {
/*                var project = projects.Where(p => p.ID == bug.ProjectID);
                if (project.Any())
                {*/
                    var result = _context.Bugs.Add(bug);
/*                    context.Projects.Where(p => p == project).First().Bugs.Add(bug);*/
                    _context.SaveChanges();
                    return result.Entity;
/*                }

                return null;*/
            }

            // ID already exist
            return null;
        }

        public bool DeleteBug(Guid bugID)
        {
            var bugs = _context.Bugs.Where(b => b.ID.Equals(bugID));
            if (bugs.Any())
            {
                _context.Bugs.Remove(bugs.First());
                _context.SaveChanges();
                return true;
            }
            
            return false;
        }

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
