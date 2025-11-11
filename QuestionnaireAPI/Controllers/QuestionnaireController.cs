using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuestionnaireAPI.Dtos;
using QuestionnaireAPI.Interfaces;
using QuestionnaireAPI.Models;

namespace QuestionnaireAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuestionnaireController : ControllerBase
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;
        public QuestionnaireController(IUnitOfWork uow, IMapper mapper)
        {
            this.uow = uow;
            this.mapper = mapper;
        }

        [HttpGet("category/{category}")]
        [AllowAnonymous]
        public async Task<ActionResult<List<Questionnaire>>> GetQuestionnairesByCategory(string category)
        {
            var questionnaires = await uow.QuestionnaireRepository.GetByCategoryAsync(category);
            var dto = mapper.Map<List<QuestionnaireDto>>(questionnaires); // Avoiding infinite cycle error
            return Ok(dto);
        }
        
        
    }
}