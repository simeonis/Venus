using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using venus.Helpers;
using venus.Models;

namespace venus.Controllers
{
    [Authorize]
    [Route("api/account")]
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;


        public AccountController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }
        
        /// <summary>
        /// Post endpoint to register for the application 
        /// </summary>
        /// <param name="RegisterDto">Register Dto with all the fields: ie username, email, password etc</param>
        /// <returns>Returns 200 ok or an error msg and status code</returns>
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            if(dto.Password != dto.PasswordConfirm)
                return new ContentResult() { Content = "Password Do Not Match", StatusCode = 403 };

            var user = new ApplicationUser() { UserName = dto.UserName, Email = dto.Email};
            
            var result = await _userManager.CreateAsync(user, dto.Password);

            if (!result.Succeeded)
            {
                return new ContentResult() { Content = "Create User Failed", StatusCode = 403 };
            }

            return Ok();
        }

        /// <summary>
        /// Post endpoint to login to the application  
        /// </summary>
        /// <param name="LoginDto">Register Dto with all the fields: ie email, and password</param>
        /// <returns>Returns 200 ok or an error msg and status code</returns>
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            Console.WriteLine("Login Endpoint");
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByEmailAsync(dto.Email);

            if (user == null)
            {
                return new ContentResult() { Content = "User Not Found", StatusCode = 403 };
            }

            if (await _userManager.CheckPasswordAsync(user, dto.Password) == false)
            {
                return new ContentResult() { Content = "Invalid Password", StatusCode = 403 };
            }

            var result = await _signInManager.PasswordSignInAsync(user.UserName, dto.Password, false, true);

            if (!result.Succeeded)
            {
                return new ContentResult() { Content = "SignIn Failed: Try Again", StatusCode = 403 };
            }
            if (result.IsLockedOut)
            {
                return new ContentResult() { Content = "Account Locked Out", StatusCode = 403 };
            }

            await _userManager.AddClaimAsync(user, new Claim("UserRole", "Admin"));
            
            
            var jwt = JwtService.Generate(user.Id);

        
            Response.Cookies.Append("jwt", jwt, new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.Now.AddDays(30)
            });
            
            return Ok(new { message="success" });
        }

        /// <summary>
        /// Endpoint to fetch a current user for a given client
        /// </summary>
        /// <returns>Returns 200 ok with user or an error msg and status code</returns>
        [HttpPost("user")]
        public async Task<IActionResult> GetUser()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                var token = JwtService.Verify(jwt);
                var userId = token.Issuer;

                var user = await _userManager.FindByIdAsync(userId);

                if (user == null)
                    return Ok(null);
                
                var userDto = new UserDto
                {
                    UserName = user.UserName,
                    Email = user.Email,
                    Projects = user.Projects,
                    id = user.Id
                };
                return Ok(userDto);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                
            }
            
            return new ContentResult() { Content = "Error Occurred", StatusCode = 403 };
        }
        

        /// <summary>
        /// Post endpoint to logout
        /// </summary>
        /// <returns>Returns 200 ok</returns>
        [HttpPost("logout")]
        public async Task<IActionResult> LogOut()
        {
            Console.WriteLine("Log out");
            
            Response.Cookies.Delete("jwt");

            await _signInManager.SignOutAsync();
            
            return Ok(new { message="success" });
        }
    }
}