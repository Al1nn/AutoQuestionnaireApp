namespace QuestionnaireAPI.Dtos.AdminDtos;

public class AdminAnswersDto
{
    public int Id { get; set; }
    
    public int QuestionId { get; set; }
    
    public string QuestionText { get; set; }
    
    public string QuestionnaireTitle { get; set; }
    
    public string Text { get; set; }
    
    public bool IsCorrect { get; set; }
    
    public int LastUpdatedBy { get; set; }
    
    public DateTime LastUpdatedOn { get; set; }
}