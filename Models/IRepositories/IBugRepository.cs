using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace venus.Models.IRepositories
{
    public interface IBugRepository
    {
        Bug GetBug(Guid bugID);
        IEnumerable<Bug> GetBugs();
        Bug AddBug(Bug bug);
        Bug UpdateBug(Bug bug);
        Bug DeleteBug(Guid bugID);
    }
}
