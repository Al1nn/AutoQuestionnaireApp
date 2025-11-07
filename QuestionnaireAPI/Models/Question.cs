using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace QuestionnaireAPI.Models;

[Table("Questions")]
public class Question : BaseEntity
{
    public int QuestionnaireId { get; set; }
    public Questionnaire Questionnaire { get; set; }
    
    public string Text { get; set; }
    
    public string Photo { get; set; }
    
    public ICollection<Answer> Answers { get; set; }
}