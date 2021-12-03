 using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using venus.Models.IRepositories;

namespace venus.Models.EFRepositories
{
    public class EFBugRepository : IBugRepository
    {
        // Temporary
        private static List<Bug> bugList = new List<Bug> 
        { 
            new Bug("Bug #1", "Test1", Status.Unassigned), 
            new Bug("Bug #2", "Test2", Status.Completed) 
        };

        public Bug GetBug(Guid bugID)
        {
            return bugList.FirstOrDefault(b => b.ID.Equals(bugID));
        }

        public IEnumerable<Bug> GetBugs()
        {
            return bugList;
        }

        public Bug AddBug(Bug bug)
        {
            // Unique ID
            if (!bugList.Where(b => b.ID.Equals(bug.ID)).Any())
            {
                bugList.Add(bug);
                return bug;
            }

            // ID already exist
            return null;
        }

        public Bug UpdateBug(Bug bug)
        {
            // TO-DO
            return bug;
        }

        public Bug DeleteBug(Guid bugID)
        {
            Bug bug = bugList.FirstOrDefault(b => b.ID.Equals(bugID));
            bugList.Remove(bug);
            return bug;
        }
    }
}
