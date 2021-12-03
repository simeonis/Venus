using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using venus.Models;

namespace venus.Controllers
{
    [ApiController]
    [Route("api/project")]
    public class ProjectController : Controller
    {
        private IProjectRepository projectRepository;

        public ProjectController(IProjectRepository repo) 
        {
            projectRepository = repo;
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
    }
}
