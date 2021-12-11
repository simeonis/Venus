// *****************************************
// Creator: Shae Simeoni
// 
// Description:
// Interface for EFBugRepository which enforces methods
// and allows for dependency injections into the necessary
// Web API Controllers.
// *****************************************

using System;
using System.Collections.Generic;

namespace venus.Models.IRepositories
{
    public interface IBugRepository
    {
        /// <summary>
        /// Retrieves a bug by ID from the database
        /// </summary>
        /// <param name="bugID">The unique bug ID</param>
        /// <returns>The first instance of a bug that matches the ID specified</returns>
        Bug GetBug(Guid bugID);
        /// <summary>
        /// Retrieves all bugs in a project from the database
        /// </summary>
        /// <param name="projectID">The unique project ID</param>
        /// <returns>All bugs that match the project ID specified</returns>
        IEnumerable<Bug> GetBugs(Guid projectID);
        /// <summary>
        /// Retrieves all bugs in the database
        /// </summary>
        /// <returns>All bugs that exist</returns>
        IEnumerable<Bug> GetBugs();
        /// <summary>
        /// Creates a bugged based on the bugDTO and adds it to the database
        /// </summary>
        /// <param name="bugDto">Contains the bug information sent by a client</param>
        /// <returns>The newly created bug, or null if an error occurs</returns>
        Bug AddBug(BugDto bug);
        /// <summary>
        /// Delete a bug from the database specified by the ID
        /// </summary>
        /// <param name="bugID">The unique bug ID</param>
        /// <returns>True if the deletion was successful, otherwise false</returns>
        bool DeleteBug(Guid bugID);
        /// <summary>
        /// Saves the database, needed for Patching
        /// </summary>
        void Save();
    }
}
