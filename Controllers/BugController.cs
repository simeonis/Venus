using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using venus.Models;
using venus.Models.IRepositories;
using venus.Helpers;


namespace venus.Controllers
{
    [ApiController]
    [Route("api/bug")]
    public class BugController : Controller
    {
        private readonly IBugRepository _bugRepository;
        private readonly IProjectRepository _projectRepository;
        
        public BugController(IBugRepository repository, IProjectRepository projectRepository)
        {
            _bugRepository = repository;
            _projectRepository = projectRepository;
        }

        [HttpGet("{id}")]
        public ActionResult<Bug> Get(Guid? id)
        {
            if (id == null)
            {
                return BadRequest("Invalid Bug-ID");
            }
            
            var bugExist = _bugRepository.GetBug(id.Value);

            try
            {
                var userId = GetUserId();
                if (userId != null && _projectRepository.IsInProject(bugExist.ProjectID, userId.Value))
                {
                    return Ok(_bugRepository.GetBug(id.Value));
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            return new ContentResult() { Content = "Error Occurred", StatusCode = 403 };
                
        }

        [HttpGet("project/{id}")]
        public ActionResult<Bug> GetProjectBugs(Guid? id)
        {
            
            if (id == null)
            {
                return BadRequest("Invalid Project-ID");
            }
            
            try
            {
                var userId = GetUserId();
                if (userId != null && _projectRepository.IsInProject(id.Value, userId.Value))
                {
                    return Ok(_bugRepository.GetBugs(id.Value));
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            
            return new ContentResult() { Content = "Error Occurred", StatusCode = 403 };
        }

        [HttpGet]
        public ActionResult<Bug> Get()
        {
            return Ok(_bugRepository.GetBugs());
        }

        [HttpPost]
        public ActionResult<Bug> Post([FromBody] BugDto bugPost)
        {

            try
            {
                var userId = GetUserId();
                if (userId != null && _projectRepository.IsInProject(bugPost.ProjectID, userId.Value))
                {
                    _bugRepository.AddBug(bugPost);
                    return Ok();
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            return new ContentResult() { Content = "Error Occurred", StatusCode = 403 };
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(Guid? id)
        {
            if (id == null)
            {
                return BadRequest("Invalid Bug-ID");
            }
            
            var bug = _bugRepository.GetBug(id.Value);

            try
            {
                var userId = GetUserId();
                if (userId != null && _projectRepository.IsInProject(bug.ProjectID, userId.Value))
                {
                    if (_bugRepository.DeleteBug(id.Value))
                    {
                        return Ok();
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            return new ContentResult() { Content = "Error Occurred", StatusCode = 403 };
            
        }

        [HttpDelete]
        public IActionResult Delete([FromBody] IEnumerable<Bug> bugs)
        {
            try
            {
                var userId = GetUserId();
                if (userId != null && _projectRepository.IsInProject(bugs.First().ProjectID, userId.Value))
                {
                    foreach (Bug bug in bugs)
                    {
                        if (!_bugRepository.DeleteBug(bug.ID))
                        {
                            return NotFound();
                        }
                    }

                    return Ok();
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            return new ContentResult() { Content = "Error Occurred", StatusCode = 403 };
        }

        [HttpPatch("{id}")]
        public IActionResult Patch(Guid? id, [FromBody] JsonPatchDocument<Bug> patch)
        {
            
            if (id == null)
            {
                return BadRequest("Invalid Bug-ID");
            }

            var bugExist = _bugRepository.GetBug(id.Value);

            var userId = GetUserId();
            
            if (userId != null && !_projectRepository.IsInProject(bugExist.ProjectID, userId.Value))
            {
                return new ContentResult() { Content = "User Not In Project", StatusCode = 404 };
            }
            
            var bug = (Bug)((OkObjectResult)Get(id).Result).Value;
                
            if (bug == null)
            {
                return NotFound();
            }
            patch.ApplyTo(bug);
            
            _bugRepository.Save();
            return Ok();
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
        
    }
}
