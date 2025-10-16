using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using QuestionnaireAPI.Configurations;
using QuestionnaireAPI.Dtos;
using QuestionnaireAPI.Errors;
using QuestionnaireAPI.Extensions;
using QuestionnaireAPI.Interfaces;
using QuestionnaireAPI.Models;
using QuestionnaireAPI.Services;

namespace QuestionnaireAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IUnitOfWork uow;
        private readonly ITokenService tokenService;
        private readonly JwtConfig jwtConfig;
        
        public AccountController(IUnitOfWork uow, ITokenService tokenService, IOptions<JwtConfig> jwtConfig)
        {
            this.uow = uow;
            this.tokenService = tokenService;
            this.jwtConfig = jwtConfig.Value;
        }


        [HttpPost("register")] //Register controller method
        public async Task<IActionResult> Register([FromForm] RegisterDto registerReq)
        {
            
            if (registerReq.Name.isEmpty() || registerReq.Password.isEmpty() || registerReq.Email.isEmpty() || registerReq.PhoneNumber.isEmpty() || registerReq.Role.isEmpty())
            {
                return BadRequest(new ApiError
                {
                    ErrorCode = BadRequest().StatusCode,
                    ErrorMessage = "Please fill all the fields"
                });
            }

            if (await uow.UserRepository.UserAlreadyExists(registerReq.Name))
            {
                return Conflict(new ApiError
                {
                    ErrorCode = Conflict().StatusCode,
                    ErrorMessage = "User already exists, try different credentials"
                });
            }
            
            uow.UserRepository.Register(registerReq.Name, registerReq.Password, registerReq.Email, registerReq.PhoneNumber, registerReq.Role, registerReq.File);
            await uow.SaveChangesAsync();
            
            return Created();
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequestDto loginReq)
        {
            if (string.IsNullOrEmpty(loginReq.Password) ||
                (string.IsNullOrEmpty(loginReq.Email) && string.IsNullOrEmpty(loginReq.Name)))
            {
                return BadRequest(new ApiError
                {
                    ErrorCode = BadRequest().StatusCode,
                    ErrorMessage = "Please provide login credentials"
                });
            }

            User user = await uow.UserRepository.Authenticate(loginReq.Name, loginReq.Email, loginReq.Password);

            if (user == null)
            {
                return Unauthorized(new ApiError
                {
                    ErrorCode = Unauthorized().StatusCode,
                    ErrorMessage = "Invalid login credentials"
                });
            }

            var accessToken = tokenService.GenerateAccessToken(user);
            var refreshToken = tokenService.GenerateRefreshToken();

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(jwtConfig.RefreshTokenExpirationDays);

            await uow.SaveChangesAsync();

            
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = false, // Use true for HTTPS in production
                SameSite = SameSiteMode.Strict, 
                Expires = user.RefreshTokenExpiry
            };

            string cookieName = $"cookie.localhost.com";
            Response.Cookies.Append(cookieName, refreshToken, cookieOptions);

            return Ok(new { accessToken });
        }


        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            try
            {
                string cookieName = $"cookie.localhost.com";
                
                if (!Request.Cookies.TryGetValue(cookieName, out var refreshToken))
                {
                    return BadRequest(new ApiError
                    {
                        ErrorCode = BadRequest().StatusCode,
                        ErrorMessage = "Cookie is missing"
                    });
                }
                
                var user = await uow.UserRepository.FindUserByRefreshTokenAsync(refreshToken);
                
                if (user != null)
                {
                    user.RefreshToken = null;
                    user.RefreshTokenExpiry = null;
                    await uow.SaveChangesAsync();
                }
                
                
                Response.Cookies.Delete(cookieName, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = false, 
                    SameSite = SameSiteMode.Strict,
                    Path = "/"
                });

                return Ok();
            }
            catch (Exception ex)
            {
                
                Console.WriteLine("Could not log out : "+ ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, new ApiError
                {
                    ErrorCode = StatusCodes.Status500InternalServerError,
                    ErrorMessage = "An error occurred while logging out"
                });
            }
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken()
        {
            try
            {
                string cookieName = $"cookie.localhost.com";

                if (!Request.Cookies.TryGetValue(cookieName, out var refreshToken))
                {
                    return BadRequest(new ApiError
                    {
                        ErrorCode = BadRequest().StatusCode,
                        ErrorMessage = "Cookie is missing"
                    });
                }
                
                var user = await uow.UserRepository.FindUserByRefreshTokenAsync(refreshToken);

                if (user == null)
                {
                    return BadRequest(new ApiError
                    {
                        ErrorCode = BadRequest().StatusCode,
                        ErrorMessage = "User doesnt exist"
                    });
                }
                
                if (user.RefreshToken != refreshToken ||
                    user.RefreshTokenExpiry <= DateTime.UtcNow)
                {
                    return BadRequest(new ApiError
                    {
                        ErrorCode = BadRequest().StatusCode,
                        ErrorMessage = "Invalid refresh token"
                    });
                }
                
                var newAccessToken = tokenService.GenerateAccessToken(user);
                var newRefreshToken = tokenService.GenerateRefreshToken();

                user.RefreshToken = newRefreshToken;
                
                
                
                //Here each time this method is called, expiry of Cookie gets reduced by 3 hours till it is expired.

                if (user.RefreshTokenExpiry.HasValue)
                {
                    user.RefreshTokenExpiry = user.RefreshTokenExpiry.Value.AddHours(-3);
                }
                else
                {
                    user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(jwtConfig.RefreshTokenExpirationDays);
                }
                
                await uow.SaveChangesAsync();
                
                var cookieOptions = new CookieOptions
                {
                    HttpOnly = true,
                    Secure = false, // Use true for HTTPS in production,
                    SameSite = SameSiteMode.Strict,
                    Expires = user.RefreshTokenExpiry 
                };

                Response.Cookies.Append(cookieName, newRefreshToken, cookieOptions);

                return Ok(new { accessToken = newAccessToken });
            }
            catch
            {
                return BadRequest(new ApiError
                {
                    ErrorCode = BadRequest().StatusCode,
                    ErrorMessage = "Invalid token"
                });
            }
        }


        [HttpGet("me")]
        [Authorize]
        public async Task<IActionResult> Profile()
        {
            int id = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            User user = await uow.UserRepository.FindUserByIdAsync(id);

            UserDto userDto = new UserDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Role = user.Role,
                Photo = user.Photo
                //Add more fields here if needed
            };
            
            return Ok(userDto);
        }

        [HttpPatch("edit/name/{newName}")] // better is HttpPatch
        [Authorize]
        public async Task<IActionResult> EditProfile(string newName)
        {
            int id = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            
            User user = await uow.UserRepository.FindUserByIdAsync(id);
            
            user.Name = newName;
            await uow.SaveChangesAsync();
            
            return Ok();
        }
        
        [HttpPatch("edit/email/{newEmail}")]
        [Authorize]
        public async Task<IActionResult> EditEmail(string newEmail)
        {
            int id = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            
            User user = await uow.UserRepository.FindUserByIdAsync(id);
            
            user.Email = newEmail;
            await uow.SaveChangesAsync();
            
            return Ok();
        }

        [HttpPatch("edit/password/{newPassword}")]
        [Authorize]
        public async Task<IActionResult> EditPassword(string newPassword)
        {
            return Ok();
        }
        
        
        [HttpPatch("edit/phoneNumber/{newPhoneNumber}")]
        [Authorize]
        public async Task<IActionResult> EditPhoneNumber(string newPhoneNumber)
        {
            return Ok();
        }
        
        [HttpPatch("edit/photo")]
        [Authorize]
        public async Task<IActionResult> EditPhoto([FromForm] IFormFile file)
        {
            int id = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            
            User user = await uow.UserRepository.FindUserByIdAsync(id); 
            
            //Find the location of the old user.photo using Directory path .NET library
            // Delete the file path with the old name file
            // Upload the new file path with the new name file
            //Update user.photo 
            // Save the changes
            
            
            return Ok();
        }
        
    }
}
