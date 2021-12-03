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
        private static List<Project> projectList = new List<Project> { new Project("Project 1", "Description1"), new Project("Project 2", "Description 2")};

        [HttpGet]
        public ActionResult<Project> Get()
        {
            return Ok(projectList);
        }

        [HttpGet("{id}")]
        public ActionResult<Project> Get(Guid id)
        {
            if(id == Guid.Empty)
            {
                return BadRequest("ID was not found");
            }

            return Ok();

        }
    }
}
