using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using venus.Models;

namespace venus.Controllers
{
    [ApiController]
    [Route("api/bug")]
    public class BugController : Controller
    {
        private static List<Bug> bugList = new List<Bug> { new Bug("Bug #1", "Test1", Status.Unassigned), new Bug("Bug #2", "Test2", Status.Completed) };

        [HttpGet]
        public ActionResult<Bug> Get()
        {
            return Ok(bugList);
        }
    }
}
