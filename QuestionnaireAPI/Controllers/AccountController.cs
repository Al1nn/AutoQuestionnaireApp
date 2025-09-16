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

            string cookieName = $"credentials_{user.Id}";
            Response.Cookies.Append(cookieName, refreshToken, cookieOptions);

            return Ok(new { accessToken });
        }


        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            try
            {
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier); 
                if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
                {
                    return BadRequest(new ApiError
                    {
                        ErrorCode = BadRequest().StatusCode,
                        ErrorMessage = "Invalid user identity"
                    });
                }

                
                
                
                string cookieName = $"credentials_{userId}";
                Response.Cookies.Delete(cookieName, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = false, // Matching login configuration
                    SameSite = SameSiteMode.Strict,
                    Path = "/"
                });
                
                var user = await uow.UserRepository.FindUserByIdAsync(userId);
                if (user != null)
                {
                    user.RefreshToken = null;
                    user.RefreshTokenExpiry = null;
                    await uow.SaveChangesAsync();
                }

                return Ok(new { message = "Successfully logged out" });
            }
            catch (Exception ex)
            {
                // Log the exception if you have a logger configured
                Console.WriteLine("Could not log out : "+ ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, new ApiError
                {
                    ErrorCode = StatusCodes.Status500InternalServerError,
                    ErrorMessage = "An error occurred while logging out"
                });
            }
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenDto refreshTokenDto)
        {
            if (string.IsNullOrEmpty(refreshTokenDto.AccessToken))
            {
                return BadRequest(new ApiError
                {
                    ErrorCode = BadRequest().StatusCode,
                    ErrorMessage = "Invalid token"
                });
            }

            try
            {
                var principal = tokenService.GetPrincipalFromExpiredToken(refreshTokenDto.AccessToken);
                var userId = int.Parse(principal.FindFirst(ClaimTypes.NameIdentifier)?.Value);

                string cookieName = $"credentials_{userId}";

                if (!Request.Cookies.TryGetValue(cookieName, out var refreshToken))
                {
                    return BadRequest(new ApiError
                    {
                        ErrorCode = BadRequest().StatusCode,
                        ErrorMessage = "Refresh token missing"
                    });
                }

                var user = await uow.UserRepository.FindUserByIdAsync(userId);
                if (user == null ||
                    user.RefreshToken != refreshToken ||
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
                user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(jwtConfig.RefreshTokenExpirationDays);

                await uow.SaveChangesAsync();

                
                var cookieOptions = new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
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


    }
}
