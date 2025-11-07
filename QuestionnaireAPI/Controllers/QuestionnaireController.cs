using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuestionnaireAPI.Interfaces;
using QuestionnaireAPI.Models;

namespace QuestionnaireAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuestionnaireController : ControllerBase
    {
        private readonly IUnitOfWork uow;
        public QuestionnaireController(IUnitOfWork uow)
        {
            this.uow = uow;
        }

        [HttpGet("category/{category}")]
        [AllowAnonymous]
        public async Task<ActionResult<List<Questionnaire>>> GetQuestionnairesByCategory(string category)
        {
            return Ok(await uow.QuestionnaireRepository.GetQuestionnairesByCategoryAsync(category));
        }
    }
}