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
        private IBugRepository bugRepository;

        public BugController(IBugRepository repository)
        {
            this.bugRepository = repository;
        }

        [HttpGet("{id}")]
        public ActionResult<Bug> Get(Guid? id)
        {
            if (id == null)
            {
                return BadRequest("Value must be passed in the request body");
            }

            return Ok(bugRepository.GetBug(id.Value));
        }

        [HttpGet]
        public ActionResult<Bug> Get()
        {
            return Ok(bugRepository.GetBugs());
        }
    }
}
