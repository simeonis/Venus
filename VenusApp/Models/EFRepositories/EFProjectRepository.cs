// *****************************************
// Creator: Shane Guther
// 
// Description:
// Project Repository to interact with the database and the web api controller via the database context
// *****************************************

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using venus.Models.IRepositories;

namespace venus.Models.EFRepositories
{
    public class EFProjectRepository : IProjectRepository
    {
        /// <summary>
        /// Creating an instance of, and then initializing the dbContext
        /// </summary>
        private readonly VenusDbContext dbContext;
        
        public EFProjectRepository(VenusDbContext ctx)
        {
            dbContext = ctx;
        }
        /// <summary>
        /// List of Projects from the database
        /// </summary>
        /// <returns>A list of projects that matches the project ID</returns>
        public IEnumerable<Project> Projects => dbContext.Projects.Include(p => p.UsersList)
                                                                  .Include(p => p.Bugs);
        /// <summary>
        /// List of Projects from the database
        /// </summary>
        /// <returns>A list of projects</returns>
        private IEnumerable<Project> ProjectsNoTrack => dbContext.Projects.AsNoTracking().Include(p => p.UsersList)
                                                                                         .Include(p => p.Bugs);
        /// <summary>
        /// List of Projects from the database
        /// </summary>
        /// <returns>A single project that matches the project ID</returns>
        public Project GetProject(Guid id)
        {
            return Projects.FirstOrDefault(p => p.ID == id);
        }

        /// <summary>
        /// Retrieves a project from the database based on the project id provided without tracking it
        /// </summary>
        /// <param name="projectID">The project ID of the desired project</param>
        /// <returns>A single project that matches the project ID</returns>
        public Project GetProjectNoTrack(Guid id)
        {
            return ProjectsNoTrack.FirstOrDefault(p => p.ID == id);
        }

        /// <summary>
        /// Retrieves a list of projects based on the user id provided
        /// </summary>
        /// <param name="userID">The project ID of the desired project</param>
        /// <returns>A list of projects that matches the user ID</returns>
        public IEnumerable<Project> GetProjects(string id)
        {
            var p = Projects.Where(project =>
                project.UsersList.Any(user =>
                    user.Id == id)).ToList();
            
            return p;
        }
        /// <summary>
        /// Adds a project to the database
        /// </summary>
        /// <param name="project">The project to be added</param>
        /// <returns>The project that was added</returns>
        public Project AddProject(Project project)
        {
            if(!dbContext.Projects.Where(p => p.ID.Equals(project.ID)).Any())
            {
                var res = dbContext.Projects.Add(project);
                dbContext.SaveChanges();
                return res.Entity;
            }
            return null;
        }
        /// <summary>
        /// Updates a project already in the database 
        /// </summary>
        /// <param name="projectID">The project ID of the desired project</param>
        /// <returns>The updated project</returns>
        public Project UpdateProject(Project project)
        {
            dbContext.Projects.Update(project);
            dbContext.SaveChanges();
            return project;
        }
        /// <summary>
        /// Deletes a project from the database based on the project id
        /// </summary>
        /// <param name="projectID">The project ID of the project to delete</param>
        public void DeleteProject(Guid id)
        {
            Project project = dbContext.Projects.FirstOrDefault(p => p.ID == id);
            dbContext.Projects.Remove(project);
            dbContext.SaveChanges();
        }
        /// <summary>
        /// Saves the changes
        /// </summary>
        public void Save()
        {
            dbContext.SaveChanges();
        }
        /// <summary>
        ///  Checks if a user is in a specific project
        /// </summary>
        /// <param name="projectID">The project ID of the project to check</param>
        /// <param name="userID">The project ID of the project to check</param>
        /// <returns>boolean based on whether the user is in the project</returns>
        public bool IsInProject(Guid projId,Guid userId)
        {
            var proj = GetProject(projId);
            if(proj == null)
                return false;
            
            return proj.UsersList.Exists(u => u.Id == userId.ToString());
        }

    }
}
