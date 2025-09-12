namespace QuestionnaireAPI.Dtos;

public class LoginResponseDto
{
    public string? AccessToken { get; set; }
    
    public string? RefreshToken { get; set; }
    
    public string? Name { get; set; }
    
    public string? Email { get; set; }
    public string? Role { get; set; }
    
    public string? Photo { get; set; }
    
    public string? PhoneNumber { get; set; }
    
    
}