using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

using venus.Models;



namespace venus.Controllers
{

    [Authorize]
    [Route("api/account")]
    public class AccountController : Controller
    {
        private const string LocalLoginProvider = "Local";
        private UserManager<ApplicationUser> _userManager;
        //private SignInManager<ApplicationUser> _signInManager;

        public AccountController(UserManager<ApplicationUser> userManager) //SigninManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            //_signInManager = signInManager;
        }

        [HttpGet("/hello")]
        public async Task<ActionResult<string>> Hello()
        {
            return "Hello";
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

            var user = new ApplicationUser() { UserName = dto.Email, Email = dto.Email };

            IdentityResult result = await _userManager.CreateAsync(user, dto.Password);

            if (!result.Succeeded)
            {
                //return GetErrorResult(result);
            }

            return Ok();
        }

        // POST api/Account/Register
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            var user = await _userManager.FindByEmailAsync(dto.Email);

            if (await _userManager.CheckPasswordAsync(user, dto.Password) == false)
            {

                // return error;
            }

            //var result = await signInManager.PasswordSignInAsync(dto.Email, dto.Password, dto.RememberMe, true);

            //IdentityResult result = await _signinManager.FindByEmailAsync(user, dto.Password);

            // if (!result.Succeeded)
            // {
            //     //return GetErrorResult(result);
            // }
            // else if (result.IsLockedOut)
            // {
            //     //return locked out 
            // }

            //await userManager.AddClaimAsync(user, new Claim("UserRole", "Admin"));
            //Take to Dashboard

            return Ok();
        }


    }

}