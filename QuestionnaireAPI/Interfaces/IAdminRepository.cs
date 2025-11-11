using QuestionnaireAPI.Dtos.AdminDtos;

namespace QuestionnaireAPI.Interfaces;

public interface IAdminRepository
{
    Task<IEnumerable<AdminQuestionDto>> GetAllQuestionsAsync();
}