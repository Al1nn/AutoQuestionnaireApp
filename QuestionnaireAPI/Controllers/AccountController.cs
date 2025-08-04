using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuestionnaireAPI.Dtos;
using QuestionnaireAPI.Errors;
using QuestionnaireAPI.Extensions;
using QuestionnaireAPI.Interfaces;

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
            ApiError apiError = new ApiError();
            if (registerReq.Name.isEmpty() || registerReq.Password.isEmpty() || registerReq.Email.isEmpty() || registerReq.PhoneNumber.isEmpty() || registerReq.Role.isEmpty())
            {
                apiError.ErrorCode = BadRequest().StatusCode;
                apiError.ErrorMessage = "Please fill all the fields";
                return BadRequest(apiError);
            }

            if (await uow.UserRepository.UserAlreadyExists(registerReq.Name))
            {
                apiError.ErrorCode = Conflict().StatusCode;
                apiError.ErrorMessage = "User already exists, try different credentials";
                return Conflict(apiError);
            }
            
            uow.UserRepository.Register(registerReq.Name, registerReq.Password, registerReq.Email, registerReq.PhoneNumber, registerReq.Role, registerReq.File);
            await uow.SaveChangesAsync();
            
            return Created();
        }
    }
}
