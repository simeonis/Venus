using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

using venus.Models;

namespace venus.Controllers{

    [Authorize]
    [Route("api/account")]
    public class UserController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public UserController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }
        
        [HttpGet("search{email}")]
        public async Task<IActionResult> Search(string email)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null)
            {
                return new ContentResult() { Content = "No User Found", StatusCode = 404 };
            }

            return Ok( user.UserName );
        }
    }
}