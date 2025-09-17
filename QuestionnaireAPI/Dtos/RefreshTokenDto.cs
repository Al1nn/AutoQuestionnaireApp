using System.ComponentModel.DataAnnotations;

namespace QuestionnaireAPI.Dtos;

public class RefreshTokenDto
{
    [Required]
    public string accessToken { get; set; }
    
    
}