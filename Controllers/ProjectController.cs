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
        private readonly IProjectRepository _projectRepository;
        private readonly UserManager<ApplicationUser> _userManager;

        public ProjectController(IProjectRepository repo, UserManager<ApplicationUser> userManager) 
        {
            _projectRepository = repo;
            _userManager = userManager;
        }

        [HttpGet("get-all")]
        public ActionResult<Project> GetAll()
        {
            try
            {
                var userId = GetUserId();
                
                return Ok(_projectRepository.GetProjects(userId.ToString()));
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
            
            var proj = _projectRepository.GetProject(id);
            
            if(proj == null)
                return new ContentResult() { Content = "Project Not found", StatusCode = 404 };
            
            try
            {
                var userId = GetUserId();
                if (userId != null && IsInProject(proj, userId.Value))
                {
                    return Ok(proj);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            
            return new ContentResult() { Content = "Error Occurred", StatusCode = 403 };
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ProjectDto projectDto)
        {
            try
            {
                var userId = GetUserId();

                if (userId == null)
                    return new ContentResult() { Content = "Error Occurred", StatusCode = 403 };
           
                var project = new Project(projectDto.Title, projectDto.Description, projectDto.Color, userId.Value);
                
                var appUser = await _userManager.FindByIdAsync(userId.ToString());
            
                if (appUser == null)
                    return new ContentResult() { Content = "User Not Found", StatusCode = 404 };

                project.UsersList = new List<ApplicationUser> { appUser };

                _projectRepository.AddProject(project);
        
                return Ok(project);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            
            return new ContentResult() { Content = "Token Error", StatusCode = 403 };
        }

        [HttpPut]
        public ActionResult<Project> Put([FromBody] Project project)
        {
            var preExistingProj = _projectRepository.GetProjectNoTrack(project.ID);

            if (preExistingProj == null)
                return new ContentResult() { Content = "Project Not found", StatusCode = 404 };

            try
            {
                var userId = GetUserId();
                if (userId != null && !IsInProject(preExistingProj, userId.Value))
                {
                    return new ContentResult() { Content = "Not in Project", StatusCode = 404 };
                } 
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return new ContentResult() { Content = "Token Error", StatusCode = 404 };
            }

            _projectRepository.UpdateProject(project);
            return Ok();
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(Guid id) {

            var project = _projectRepository.GetProject(id);

            if (project == null)
                return new ContentResult() { Content = "Project Not found", StatusCode = 404 };
            
            try
            {
                var userId = GetUserId();
                if (userId == null || !IsProjOwner(project, userId.Value))
                {
                    return new ContentResult() { Content = "Not Project Owner", StatusCode = 404 };
                }
                
                _projectRepository.DeleteProject(id);

                return Ok();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            return new ContentResult() { Content = "Token Error", StatusCode = 404 };

        }

        [HttpPatch("{id}")]
        public StatusCodeResult Patch(Guid id, [FromBody] JsonPatchDocument<Project> patch)
        {
            var project = (Project)((OkObjectResult)Get(id).Result).Value;
            
            if (project == null)
                return NotFound();

            try
            {
                var userId = GetUserId();
                if (userId != null && IsInProject(project, userId.Value))
                {
                    patch.ApplyTo(project);
                    _projectRepository.Save();
                    return Ok();
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            return new NotFoundResult();
        }

        [HttpPost("add-user")]
        public async Task<IActionResult> AddUserToProject([FromBody] UserToProjDto userToProjDto)
        {
            var project = _projectRepository.GetProject(userToProjDto.ProjId);

            if (project == null)
                return new ContentResult() { Content = "Project Not found", StatusCode = 404 };
            try
            {
                var userId = GetUserId();
                if (userId != null && !IsProjOwner(project, userId.Value))
                {
                    return new ContentResult() { Content = "User not Owner", StatusCode = 404 };
                }
                
                if(project.UsersList.Any(user => user.Email == userToProjDto.UserEmail))
                    return new ContentResult() { Content = "User Already Exists", StatusCode = 403 };
            
                var appUser = await _userManager.FindByEmailAsync(userToProjDto.UserEmail);
            
                if (appUser == null)
                    return new ContentResult() { Content = "User Not Found", StatusCode = 404 };
            
                project.UsersList.Add(appUser);

                _projectRepository.UpdateProject(project);

                return Ok(appUser);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            return new ContentResult() { Content = "Token Error", StatusCode = 404 };
        }   

        [HttpGet("get-members")]
        public ActionResult<IEnumerable<ApplicationUser>> GetMembers(string id)
        {
            

            try
            {
                var guid = Guid.Parse(id);
            
                var project = _projectRepository.GetProject(guid);
            
                if (project == null)
                    return new ContentResult() { Content = "Project Not found", StatusCode = 404 };
                
                var userId = GetUserId();
                if (userId != null && IsInProject(project, userId.Value))
                {
                    if(project.UsersList.Count <=0)
                        return new ContentResult() { Content = "No Users In Project", StatusCode = 404 };
            
                    return Ok(project.UsersList);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            return new ContentResult() { Content = "Token Error", StatusCode = 404 };
        }
        
        [HttpDelete("remove-user")]
        public ActionResult<List<ApplicationUser>> RemoveUserFromProject([FromBody] UserToProjDto userToProjDto)
        {
            var project = _projectRepository.GetProject(userToProjDto.ProjId);
            
            if (project == null)
                return new ContentResult() { Content = "Project Not found", StatusCode = 404 };
            
            try
            {
                var userId = GetUserId();
                if (userId != null && !IsProjOwner(project, userId.Value))
                {
                    return new ContentResult() { Content = "User Not Owner", StatusCode = 404 };
                }
                
                var user = project.UsersList.Find(u => u.Email == userToProjDto.UserEmail);
            
                if (user == null)
                    return new ContentResult() { Content = "User Not Found", StatusCode = 404 };
            
                project.UsersList.Remove(user);
            
                _projectRepository.UpdateProject(project);
            
                return Ok(project.UsersList);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            return new ContentResult() { Content = "Token Error", StatusCode = 404 };
        }
        
        [HttpDelete("remove-self")]
        public async Task<IActionResult> RemoveSelfFromProject([FromBody] UserToProjDto userToProjDto)
        {
            var project = _projectRepository.GetProject(userToProjDto.ProjId);
            
            if (project == null)
                return new ContentResult() { Content = "Project Not found", StatusCode = 404 };
            
            try
            {
                var userId = GetUserId();

                var accessingUser = await _userManager.FindByEmailAsync(userToProjDto.UserEmail);
                
                if (userId != null && userId != Guid.Parse(accessingUser.Id))
                {
                    return new ContentResult() { Content = "User Not Owner", StatusCode = 404 };
                }
                
                var user = project.UsersList.Find(u => u.Email == userToProjDto.UserEmail);
            
                if (user == null)
                    return new ContentResult() { Content = "User Not Found", StatusCode = 404 };
            
                project.UsersList.Remove(user);
            
                _projectRepository.UpdateProject(project);
            
                return Ok(project.UsersList);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            return new ContentResult() { Content = "Token Error", StatusCode = 404 };
        }

        private Guid? GetUserId()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                var token = JwtService.Verify(jwt);
                var userId = token.Issuer;

                return Guid.Parse(userId);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            return null;
        }

        private static bool IsProjOwner(Project project,Guid userId)
        {
            try
            {
                if (project.OwnerID == userId)
                {
                    return true;
                }
            }
            catch(Exception e)
            {
                Console.WriteLine(e);
            }
            
            return false;

        }
        
        private bool IsInProject(Project project,Guid userId)
        {
            return project.UsersList.Exists(u => u.Id == userId.ToString());
        }
    }
}
