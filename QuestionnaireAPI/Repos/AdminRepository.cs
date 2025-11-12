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


    public async Task<List<AdminQuestionDto>> GetAllQuestionsAsync()
    {
        return await dc.Questions
            .Select(q => new AdminQuestionDto
            {
                Id = q.Id,
                QuestionnaireId = q.QuestionnaireId,
                QuestionnaireTitle = q.Questionnaire.Title, 
                Text = q.Text,
                Photo = q.Photo,
                LastUpdatedBy = q.LastUpdatedBy,
                LastUpdatedOn = q.LastUpdatedOn
            })
            .OrderBy(q => q.Id)
            .ToListAsync();

    }

    public async Task<List<AdminAnswersDto>> GetAllAnswersAsync()
    {
        return await dc.Answers
            .Select(qa => new AdminAnswersDto
            {
                Id = qa.Id,
                QuestionId = qa.QuestionId,
                QuestionText = qa.Question.Text,
                QuestionnaireTitle = qa.Question.Questionnaire.Title,
                Text = qa.Text,
                IsCorrect = qa.IsCorrect,
                LastUpdatedBy = qa.LastUpdatedBy,
                LastUpdatedOn = qa.LastUpdatedOn
            })
            .OrderBy(qa => qa.Id)
            .ToListAsync();
    }
}