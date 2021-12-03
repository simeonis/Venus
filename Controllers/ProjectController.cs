﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using venus.Models;
using venus.Models.IRepositories;

namespace venus.Controllers
{
    [ApiController]
    [Route("api/project")]
    public class ProjectController : Controller
    {
        private readonly IProjectRepository projectRepository;
        private readonly UserManager<ApplicationUser> _userManager;

        public ProjectController(IProjectRepository repo, UserManager<ApplicationUser> userManager) 
        {
            projectRepository = repo;
            _userManager = userManager;
        }


        private static List<Project> projectList = new List<Project> { new Project("Project 1", "Description1"), new Project("Project 2", "Description 2")};

        [HttpGet]
        public ActionResult<Project> Get()
        {
            //Test GET with list above
            return Ok(projectList);

            //Once DB is set up
            //return Ok(projectRepository.GetProjects());
        }

        [HttpGet("{id}")]
        public ActionResult<Project> Get(Guid id)
        {
            if(id == Guid.Empty)
            {
                return BadRequest("ID was not found");
            }

            //Test GET with list above
            return Ok(projectList.Where(p => p.ID == id));

            //Once DB is set up
            //return Ok(projectRepository.GetProject(id));

        }

        [HttpPost]
        public Project Post([FromBody] Project project) =>
        
            projectRepository.AddProject(
                new Project
                {
                    //ID = Guid.NewGuid(),
                    Title = project.Title,
                    Description = project.Description,
                }
                );
        [HttpPut]
        public Project Put([FromBody] Project project) =>
            projectRepository.UpdateProject(project);
        
        [HttpDelete("{id}")]
        public void Delete(Guid id) => 
            projectRepository.DeleteProject(id);

        //Patch TO DO

        [HttpPost("add-user" )]
        public async Task<IActionResult> AddUserToProject([FromBody] UserToProjDto userToProjDto)
        {
            //Add Security 
            //Check if cookie user is owner of proj 
            
            var project = projectRepository.GetProject(userToProjDto.ProjId);
            
            if (project == null)
                return new ContentResult() { Content = "Project Not found", StatusCode = 404 };
            
            if(project.UsersList.All(u => u.Email == userToProjDto.UserEmail))
                return new ContentResult() { Content = "User Already Exists", StatusCode = 403 };

            var appUser = await _userManager.FindByEmailAsync(userToProjDto.UserEmail);

            if (appUser == null)
                return new ContentResult() { Content = "User Not Found", StatusCode = 404 };
                
            project.UsersList.Add(appUser);

            return Ok(new {message = "success"});
        }

        [HttpGet("get-members{projId:guid}")]
        public ActionResult<IEnumerable<ApplicationUser>> GetMembers(Guid projId)
        {
            //Add Security 
            //Check if cookie user is owner of proj 
            
            var project = projectRepository.GetProject(projId);
            
            if (project == null)
                return new ContentResult() { Content = "Project Not found", StatusCode = 404 };
            
            if(project.UsersList.Count <=0)
                return new ContentResult() { Content = "No Users In Project", StatusCode = 404 };
            
            return Ok(project.UsersList);
            
        }
        
        [HttpDelete("remove-user")]
        public ActionResult<List<ApplicationUser>> RemoveUserFromProject([FromBody] UserToProjDto userToProjDto)
        {
            //Add Security 
            //Check if cookie user is owner of proj 
            
            var project = projectRepository.GetProject(userToProjDto.ProjId);
            
            if (project == null)
                return new ContentResult() { Content = "Project Not found", StatusCode = 404 };

            var user = project.UsersList.Find(u => u.Email == userToProjDto.UserEmail);

            if (user == null)
                return new ContentResult() { Content = "User Not Found", StatusCode = 404 };
          
            project.UsersList.Remove(user);
            return Ok(project.UsersList);
        }
    }
}
