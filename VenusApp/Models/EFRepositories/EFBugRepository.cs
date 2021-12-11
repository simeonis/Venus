// *****************************************
// Creator: Shae Simeoni
// 
// Description:
// Middle man between Entity Framework Core Database and Web API Controller.
// Notifies the Database what actions to perform based on the HTTP Request received
// in the Web API Controller.
// *****************************************

using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using venus.Models.IRepositories;

namespace venus.Models.EFRepositories
{
    public class EFBugRepository : IBugRepository
    {
        /// <summary>
        /// Reference to the Entity Framework Core database
        /// </summary>
        private readonly VenusDbContext _context;

        public EFBugRepository(VenusDbContext context)
        {
            this._context = context;
        }

        /// <summary>
        /// Retrieves a bug by ID from the database
        /// </summary>
        /// <param name="bugID">The unique bug ID</param>
        /// <returns>The first instance of a bug that matches the ID specified</returns>
        public Bug GetBug(Guid bugID)
        {
            return _context.Bugs.FirstOrDefault(b => b.ID.Equals(bugID));
        }

        /// <summary>
        /// Retrieves all bugs in a project from the database
        /// </summary>
        /// <param name="projectID">The unique project ID</param>
        /// <returns>All bugs that match the project ID specified</returns>
        public IEnumerable<Bug> GetBugs(Guid projectID)
        {
            return _context.Bugs.Where(b => b.ProjectID == projectID).ToList();
        }

        /// <summary>
        /// Retrieves all bugs in the database
        /// </summary>
        /// <returns>All bugs that exist</returns>
        public IEnumerable<Bug> GetBugs()
        {
            return _context.Bugs.ToList();
        }

        /// <summary>
        /// Creates a bugged based on the bugDTO and adds it to the database
        /// </summary>
        /// <param name="bugDto">Contains the bug information sent by a client</param>
        /// <returns>The newly created bug, or null if an error occurs</returns>
        public Bug AddBug(BugDto bugDto)
        {
            Bug bug = new Bug(bugDto);

            // Unique ID
            if (!_context.Bugs.Where(b => b.ID.Equals(bug.ID)).Any())
            {
                var result = _context.Bugs.Add(bug);
                _context.SaveChanges();
                return result.Entity;
            }

            // ID already exist
            return null;
        }

        /// <summary>
        /// Delete a bug from the database specified by the ID
        /// </summary>
        /// <param name="bugID">The unique bug ID</param>
        /// <returns>True if the deletion was successful, otherwise false</returns>
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

        /// <summary>
        /// Saves the database, needed for Patching
        /// </summary>
        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
