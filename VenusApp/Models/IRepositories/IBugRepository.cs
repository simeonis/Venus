using System;
using System.Collections.Generic;

namespace venus.Models.IRepositories
{
    public interface IBugRepository
    {
        Bug GetBug(Guid bugID);
        IEnumerable<Bug> GetBugs(Guid projectID);
        IEnumerable<Bug> GetBugs();
        Bug AddBug(BugDto bug);
        bool DeleteBug(Guid bugID);
        void Save();
    }
}
