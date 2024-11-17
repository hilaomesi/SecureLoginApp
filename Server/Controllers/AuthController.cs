using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Services;
using Microsoft.AspNetCore.Authorization;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly JwtService _jwtService;

        public AuthController(UserService userService, JwtService jwtService)
        {
            _userService = userService;
            _jwtService = jwtService;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] User newUser)
        {
            if (string.IsNullOrEmpty(newUser.Role))
            {
                newUser.Role = "User";  
            }

            var userExists = _userService.GetUserByUsername(newUser.Username);
            if (userExists != null)
            {
                return BadRequest("Username already exists.");
            }

            _userService.AddUser(newUser);

            var token = _jwtService.GenerateToken(newUser.Username, newUser.Role);

            return Ok(new { Token = token });
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] User loginUser)
        {
            var user = _userService.GetUserByUsername(loginUser.Username);

            if (user == null || user.Password != loginUser.Password)
            {
                return Unauthorized("Invalid username or password.");
            }

            var token = _jwtService.GenerateToken(user.Username, user.Role);

            return Ok(new { Token = token });
        }

        [Authorize]
        [HttpGet("protected")]
        public IActionResult Protected()
        {
            return Ok("This is a protected resource.");
        }
    }
}
