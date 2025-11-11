namespace QuestionnaireAPI.Dtos.AdminDtos;

public class AdminQuestionDto
{
    public int Id { get; set; }
    public int QuestionnaireId { get; set; }
    public string QuestionnaireTitle { get; set; }
    public string Text { get; set; }
    public string? Photo { get; set; }
    public int LastUpdatedBy { get; set; }
    public DateTime LastUpdatedOn { get; set; }
}
