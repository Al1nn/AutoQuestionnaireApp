using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuestionnaireAPI.Dtos;
using QuestionnaireAPI.Errors;
using QuestionnaireAPI.Extensions;
using QuestionnaireAPI.Interfaces;
using QuestionnaireAPI.Models;

namespace QuestionnaireAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IUnitOfWork uow;
        
        public AccountController(IUnitOfWork uow)
        {
            this.uow = uow;
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
            
            return Ok();
        }
    }
}
