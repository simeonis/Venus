using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

using venus.Models;

namespace venus.Controllers{

    [ApiController]
    [Route("api/user")]
    public class UserController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public UserController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        /// <summary>
        /// Search endpoint  (Get) 
        /// </summary>
        /// <param name="email">A email address</param>
        /// <returns>Returns a found user, or error</returns>
        [HttpGet("search")]
        public async Task<IActionResult> Search(string email)
        {
          
            if(email == null)
                return new ContentResult() { Content = "No email", StatusCode = 404 }; 

            var user = await _userManager.FindByEmailAsync(email);

            if (user == null)
                return new ContentResult() { Content = "No User Found", StatusCode = 404 };
            

            return Ok(user);
        }

        /// <summary>
        /// Get a username by id 
        /// </summary>
        /// <param name="id">A guid for a user</param>
        /// <returns>Returns a 200 with username or error</returns>
        [HttpGet("username/{id}")]
        public async Task<IActionResult> Get(Guid? id)
        {
            if (id == null)
            {
                return BadRequest();
            }

            var user = await _userManager.FindByIdAsync(id.ToString());

            if (user == null)
            {
                return new ContentResult() { Content = "No User Found", StatusCode = 404 };
            }

            return Ok(user.UserName);
        }
    }
}