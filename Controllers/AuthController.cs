using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
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

        // POST api/Account/Register
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Console.WriteLine("Register");

            var user = new ApplicationUser() { UserName = dto.Email, Email = dto.Email };

            IdentityResult result = await _userManager.CreateAsync(user, dto.Password);

            if (!result.Succeeded)
            {
                return new ContentResult() { Content = "Create User Failed", StatusCode = 403 };
            }

            return Ok();
        }

        // POST api/Account/Register
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
                return new ContentResult() { Content = "Bad Password", StatusCode = 403 };
            }

            var result = await _signInManager.PasswordSignInAsync(dto.Email, dto.Password, dto.RememberMe, true);

            if (!result.Succeeded)
            {
                return new ContentResult() { Content = "SignIn Failed: Try Again", StatusCode = 403 };
            }
            if (result.IsLockedOut)
            {
                return new ContentResult() { Content = "Account Locked Out", StatusCode = 403 };
            }

            await _userManager.AddClaimAsync(user, new Claim("UserRole", "Admin"));

            var userDto = new UserDto
            {
                Name = user.UserName
            };

            
            var jwt = JwtService.Generate(user.Id);

            if (dto.RememberMe)
            {
                Response.Cookies.Append("jwt", jwt, new CookieOptions
                {
                    HttpOnly = true,
                    Expires = DateTime.Now.AddDays(30)
                });
            }
            else
            {
                Response.Cookies.Append("jwt", jwt, new CookieOptions
                {
                    HttpOnly = true,
                });
            }

            return Ok(new { message="success" });
        }


        [HttpPost("user")]
        public async Task<IActionResult> GetUser()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                var token = JwtService.Verify(jwt);
                var userId = token.Issuer;

                var user = await _userManager.FindByIdAsync(userId);

                var userDto = new UserDto
                {
                    Name = user.UserName,
                    Email = user.Email,
                    Projects = user.Projects
                };
                return Ok(userDto);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                
            }
            
            return new ContentResult() { Content = "Error Occurred", StatusCode = 403 };
        }
        
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