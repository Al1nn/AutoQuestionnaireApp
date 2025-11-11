using Microsoft.EntityFrameworkCore;
using QuestionnaireAPI.Data;
using QuestionnaireAPI.Dtos.AdminDtos;
using QuestionnaireAPI.Interfaces;

namespace QuestionnaireAPI.Repos;

public class AdminRepository : IAdminRepository
{
    private readonly DataContext dc;

    public AdminRepository(DataContext dc)
    {
        this.dc = dc;
    }


    public async Task<IEnumerable<AdminQuestionDto>> GetAllQuestionsAsync()
    {
        return await dc.Questions
            .Select(q => new AdminQuestionDto
            {
                Id = q.Id,
                QuestionnaireId = q.QuestionnaireId,
                QuestionnaireTitle = q.Questionnaire.Title, // 
                Text = q.Text,
                Photo = q.Photo,
                LastUpdatedBy = q.LastUpdatedBy,
                LastUpdatedOn = q.LastUpdatedOn
            })
            .OrderBy(q => q.Id)
            .ToListAsync();

    }
}