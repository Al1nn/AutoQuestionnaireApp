using QuestionnaireAPI.Models;

namespace QuestionnaireAPI.Interfaces;

public interface IQuestionnaireRepository
{
    Task<List<Questionnaire>> GetByCategoryAsync(string category);
}