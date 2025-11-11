using QuestionnaireAPI.Dtos;
using QuestionnaireAPI.Models;
namespace QuestionnaireAPI.Helpers;
using AutoMapper;
public class MapperProfiles : Profile 
{
    public MapperProfiles()
    {
        CreateMap<Questionnaire, QuestionnaireDto>().ReverseMap();
        CreateMap<Question, QuestionDto>().ReverseMap();
        CreateMap<Answer, AnswerDto>().ReverseMap();
        
        //More mappings will be added here
       
    }
}