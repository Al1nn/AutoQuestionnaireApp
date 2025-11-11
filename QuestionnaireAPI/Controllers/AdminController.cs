
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuestionnaireAPI.Interfaces;
using QuestionnaireAPI.Models;

namespace QuestionnaireAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Policy = "RequireAdmin")]
    public class AdminController : ControllerBase
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;
        
        public AdminController(IUnitOfWork uow, IMapper mapper)
        {
            this.uow = uow;
            this.mapper = mapper;
        }

        [HttpGet("questions")]
        public async Task<IActionResult> GetQuestions()
        {
            var questions = await uow.AdminRepository.GetAllQuestionsAsync();
            
            return Ok(questions);
        }
    }
}

