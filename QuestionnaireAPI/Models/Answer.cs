using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace QuestionnaireAPI.Models;


[Table("Answers")]
public class Answer : BaseEntity
{
    public int QuestionId { get; set; }
    public Question Question { get; set; }
    
    public string Text { get; set; }
    
    public bool IsCorrect { get; set; }
}