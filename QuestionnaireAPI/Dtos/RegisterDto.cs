using Microsoft.AspNetCore.Mvc;

namespace QuestionnaireAPI.Dtos;

public class RegisterDto
{
    public string Name { get; set; }
    
    public string Password { get; set; }
    
    public string Email { get; set; }
    
    public string PhoneNumber { get; set; }
    
    public string Role { get; set; }
    public IFormFile? File { get; set; }
}