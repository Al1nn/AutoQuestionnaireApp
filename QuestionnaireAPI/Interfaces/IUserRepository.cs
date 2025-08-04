namespace QuestionnaireAPI.Interfaces;

public interface IUserRepository
{
    void Register(string name, string password, string email, string phoneNumber, string role, IFormFile? file);
    
    Task<bool> UserAlreadyExists(string username);
}