using System.ComponentModel.DataAnnotations;

namespace QuestionnaireAPI.Dtos;

public class RefreshTokenDto
{
    [Required]
    public string AccessToken { get; set; }
    [Required]
    public string RefreshToken { get; set; }
}