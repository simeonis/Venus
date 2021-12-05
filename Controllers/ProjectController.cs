using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using venus.Helpers;
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


        //private static List<Project> projectList = new List<Project> { new Project("Project 1", "Description1"), new Project("Project 2", "Description 2")};
        
        [HttpGet("get-all")]
        public ActionResult<Project> GetAll()
        {
            
            try
            {
                var jwt = Request.Cookies["jwt"];
                var token = JwtService.Verify(jwt);
                var userId = token.Issuer;
                
                return Ok(projectRepository.GetProjects(userId));
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            
            return new ContentResult() { Content = "Error Occurred", StatusCode = 403 };
            
        }

        [HttpGet("{id}")]
        public ActionResult<Project> Get(Guid id)
        {
            if(id == Guid.Empty)
            {
                return BadRequest("ID was not found");
            }

            return Ok(projectRepository.GetProject(id));
        }

        [HttpPost]
        public Project Post([FromBody] ProjectDto project) =>
        
            projectRepository.AddProject(project);


        [HttpPut]
        public Project Put([FromBody] Project project) =>
            projectRepository.UpdateProject(project);
        

        [HttpDelete("{id}")]
        public void Delete(Guid id) => 
            projectRepository.DeleteProject(id);


        [HttpPatch("{id}")]
        public StatusCodeResult Patch(Guid id, [FromBody] JsonPatchDocument<Project> patch)
        {
            var project = (Project)((OkObjectResult)Get(id).Result).Value;
            if(project != null)
            {
                patch.ApplyTo(project);
                projectRepository.Save();
                return Ok();
            }
            return NotFound();

        }

        [HttpPost("add-user" )]
        public async Task<IActionResult> AddUserToProject([FromBody] UserToProjDto userToProjDto)
        {
            //Add Security 
            //Check if cookie user is owner of proj 
            
            Console.WriteLine("adduser" + userToProjDto.ProjId + " " + userToProjDto.UserEmail );

            var project = projectRepository.GetProject(userToProjDto.ProjId);

            if (project == null)
                return new ContentResult() { Content = "Project Not found", StatusCode = 404 };
            
            // if (project.UsersList == null)
            //     return new ContentResult() { Content = "No Users", StatusCode = 404 };
            
            if(project.UsersList.Any(user => user.Email == userToProjDto.UserEmail))
                return new ContentResult() { Content = "User Already Exists", StatusCode = 403 };
            
            var appUser = await _userManager.FindByEmailAsync(userToProjDto.UserEmail);
            
            if (appUser == null)
                return new ContentResult() { Content = "User Not Found", StatusCode = 404 };
            
            project.UsersList.Add(appUser);
            
            Console.WriteLine("adduser" + project.UsersList[0]);

            projectRepository.UpdateProject(project);

            return Ok(appUser);
        }   

        [HttpGet("get-members")]
        public ActionResult<IEnumerable<ApplicationUser>> GetMembers(string id)
        {
            //Add Security 
            //Check if cookie user is owner of proj 

            var guid = Guid.Parse(id);
            
            var project = projectRepository.GetProject(guid);
            
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
            
            Console.WriteLine(userToProjDto.ProjId);
            
            var project = projectRepository.GetProject(userToProjDto.ProjId);
            
            if (project == null)
                return new ContentResult() { Content = "Project Not found", StatusCode = 404 };
            
            var user = project.UsersList.Find(u => u.Email == userToProjDto.UserEmail);
            
            if (user == null)
                return new ContentResult() { Content = "User Not Found", StatusCode = 404 };
            
            project.UsersList.Remove(user);
            
            projectRepository.UpdateProject(project);
            
            return Ok(project.UsersList);

        }
    }
}
