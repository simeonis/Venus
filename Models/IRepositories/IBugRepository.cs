using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
