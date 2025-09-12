using System.Security.Claims;
using Microsoft.AspNetCore.Http;
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
            
            return Ok(new LoginResponseDto
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                Name = user.Name,
                Role = user.Role,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Photo = user.Photo,
            });
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenDto refreshTokenDto)
        {
            try
            {
                var principal = tokenService.GetPrincipalFromExpiredToken(refreshTokenDto.AccessToken);
                var userId = int.Parse(principal.FindFirst(ClaimTypes.NameIdentifier)?.Value);

                var user = await uow.UserRepository.FindUserByIdAsync(userId);
                if (user == null || 
                    user.RefreshToken != refreshTokenDto.RefreshToken || 
                    user.RefreshTokenExpiry <= DateTime.UtcNow)
                {
                    return BadRequest(new ApiError
                    {
                        ErrorCode = BadRequest().StatusCode,
                        ErrorMessage = "Invalid token"
                    });
                }

                var newAccessToken = tokenService.GenerateAccessToken(user);
                var newRefreshToken = tokenService.GenerateRefreshToken();

                user.RefreshToken = newRefreshToken;
                user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(jwtConfig.RefreshTokenExpirationDays);
                await uow.SaveChangesAsync();

                return Ok(new LoginResponseDto
                {
                    AccessToken = newAccessToken,
                    RefreshToken = newRefreshToken,
                    Name = user.Name,
                    Role = user.Role,
                    Email = user.Email,
                    PhoneNumber = user.PhoneNumber,
                    Photo = user.Photo,
                });
            }
            catch (Exception)
            {
                return BadRequest("Invalid token");
            }
        }

    }
}
