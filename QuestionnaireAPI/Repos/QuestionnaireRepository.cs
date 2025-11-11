using Microsoft.EntityFrameworkCore;
using QuestionnaireAPI.Data;
using QuestionnaireAPI.Interfaces;
using QuestionnaireAPI.Models;

namespace QuestionnaireAPI.Repos;

public class QuestionnaireRepository : IQuestionnaireRepository
{
    private readonly DataContext dc;
    public QuestionnaireRepository(DataContext dc)
    {
        this.dc = dc;
    }

    public async Task<List<Questionnaire>> GetByCategoryAsync(string category)
    {
        return await dc.Questionnaires.Where(q => q.Category == category.ToUpper())
            .Include(qs => qs.Questions)
            .ThenInclude(qa => qa.Answers)
            .ToListAsync();
    }

    public Task<List<Question>> GetAllQuestionsAsync()
    {
        throw new NotImplementedException();
    }
}