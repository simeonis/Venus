using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

using venus.Models;


namespace venus.Controllers
{

    [Authorize]
    [Route("api/account")]
    public class AccountController : Controller
    {
        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _signInManager;

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
            else if (result.IsLockedOut)
            {
                return new ContentResult() { Content = "Account Locked Out", StatusCode = 403 };
            }

            await _userManager.AddClaimAsync(user, new Claim("UserRole", "Admin"));

            var UserDto = new UserDto
            {
                Name = user.UserName
            };

            return Ok(UserDto);
        }
    }
}