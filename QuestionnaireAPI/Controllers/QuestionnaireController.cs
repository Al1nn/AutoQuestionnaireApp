using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace QuestionnaireAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuestionnaireController : ControllerBase
    {
        public QuestionnaireController()
        {

        }

        [HttpGet("questions")]
        public IActionResult GetQuestions()
        {
            string[] questions = { "Test intrebare conexiune?", "Raspuns intrebare conexiune" };
            return Ok(questions);
        }
    }
}