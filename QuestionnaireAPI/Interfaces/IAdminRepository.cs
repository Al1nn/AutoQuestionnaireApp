using QuestionnaireAPI.Dtos.AdminDtos;

namespace QuestionnaireAPI.Interfaces;

public interface IAdminRepository
{
    Task<List<AdminQuestionDto>> GetAllQuestionsAsync();
    
    Task<List<AdminAnswersDto>> GetAllAnswersAsync();
}