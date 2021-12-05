using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using venus.Models;
using venus.Models.IRepositories;

namespace venus.Controllers
{
    [ApiController]
    [Route("api/bug")]
    public class BugController : Controller
    {
        private readonly IBugRepository bugRepository;
        
        public BugController(IBugRepository repository)
        {
            bugRepository = repository;
        }

        [HttpGet("{id}")]
        public ActionResult<Bug> Get(Guid? id)
        {
            if (id == null)
            {
                return BadRequest("Invalid Bug-ID");
            }

            return Ok(bugRepository.GetBug(id.Value));
        }

        [HttpGet]
        public ActionResult<Bug> Get()
        {
            return Ok(bugRepository.GetBugs());
        }

        [HttpPost]
        public Bug Post([FromBody] BugDto bugPost) => bugRepository.AddBug(bugPost);

        [HttpDelete("{id}")]
        public StatusCodeResult Delete(Guid? id)
        {
            if (bugRepository.DeleteBug(id.Value))
            {
                return Ok();
            }

            return NotFound();
        }

        [HttpDelete]
        public StatusCodeResult Delete([FromBody] IEnumerable<Bug> bugs)
        {
            foreach (Bug bug in bugs)
            {
                if (!bugRepository.DeleteBug(bug.ID))
                {
                    return NotFound();
                }
            }

            return Ok();
        }

        [HttpPatch("{id}")]
        public StatusCodeResult Patch(Guid? id, [FromBody] JsonPatchDocument<Bug> patch)
        {
            var bug = (Bug)((OkObjectResult)Get(id).Result).Value;
            if (bug != null)
            {
                patch.ApplyTo(bug);
                bugRepository.Save();
                return Ok();
            }

            return NotFound();
        }
    }
}
