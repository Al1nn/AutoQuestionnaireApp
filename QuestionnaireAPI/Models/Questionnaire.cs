namespace QuestionnaireAPI.Models;

public class Questionnaire : BaseEntity
{
    public string Title { get; set; }
    
    public string Category { get; set; }
    
    public ICollection<Question> Questions { get; set; }
}