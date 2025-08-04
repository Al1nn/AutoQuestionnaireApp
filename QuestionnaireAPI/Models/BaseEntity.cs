namespace QuestionnaireAPI.Models;

public class BaseEntity
{
    public int Id { get; set; }

    public int LastUpdatedBy { get; set; }
    
    public DateTime LastUpdatedOn { get; set; } = DateTime.UtcNow;
}