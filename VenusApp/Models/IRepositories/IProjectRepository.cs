// *****************************************
// Creator: Shane Guther
// 
// Description:
// Interface for the EFProjectRepository to use to access database interaction methods
// *****************************************

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace venus.Models.IRepositories
{
    public interface IProjectRepository 
    {
        /// <summary>
        /// List of Projects from the database
        /// </summary>
        IEnumerable<Project> Projects { get; }
        /// <summary>
        /// Retrieves a project from the database based on the id provided
        /// </summary>
        /// <param name="projectID">The project ID of the desired project</param>
        /// <returns>A single project that matches the project ID</returns>
        Project GetProject(Guid id);
        /// <summary>
        /// Retrieves a project from the database based on the project id provided without tracking it
        /// </summary>
        /// <param name="projectID">The project ID of the desired project</param>
        /// <returns>A single project that matches the project ID</returns>
        Project GetProjectNoTrack(Guid id);
        /// <summary>
        /// Retrieves a list of projects based on the user id provided
        /// </summary>
        /// <param name="userID">The project ID of the desired project</param>
        /// <returns>A list of projects that matches the user ID</returns>
        IEnumerable<Project> GetProjects(string id);
        /// <summary>
        /// Adds a project to the database
        /// </summary>
        /// <param name="project">The project to be added</param>
        /// <returns>The project that was added</returns>
        Project AddProject(Project project);
        /// <summary>
        /// Updates a project already in the database 
        /// </summary>
        /// <param name="projectID">The project ID of the desired project</param>
        /// <returns>The updated project</returns>
        Project UpdateProject(Project project);
        /// <summary>
        /// Deletes a project from the database based on the project id
        /// </summary>
        /// <param name="projectID">The project ID of the project to delete</param>
        void DeleteProject(Guid id);
        /// <summary>
        /// Saves the changes
        /// </summary>
        void Save();
        /// <summary>
        ///  Checks if a user is in a specific project
        /// </summary>
        /// <param name="projectID">The project ID of the project to check</param>
        /// <param name="userID">The project ID of the project to check</param>
        /// <returns>boolean based on whether the user is in the project</returns>
        bool IsInProject(Guid projId, Guid userId);
    }
}
