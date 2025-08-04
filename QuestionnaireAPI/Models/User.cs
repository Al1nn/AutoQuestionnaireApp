namespace QuestionnaireAPI.Models;

public class User : BaseEntity
{
    public string Name { get; set; }
    
    public string Email { get; set; }
    
    public byte[] Password { get; set; }
    
    public byte[] PasswordKey { get; set; }
    
    public string PhoneNumber { get; set; }
    
    public string Photo { get; set; }
    
    public string Role { get; set; }
}