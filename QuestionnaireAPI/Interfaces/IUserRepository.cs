using QuestionnaireAPI.Models;

namespace QuestionnaireAPI.Interfaces;

public interface IUserRepository
{
    void Register(string name, string password, string email, string phoneNumber, string role, IFormFile? file);
    
    Task<User> Authenticate(string name, string email, string password);
    
    Task<bool> UserAlreadyExists(string name);

    Task<User> FindUserByIdAsync(int id);

    Task<User> FindUserByRefreshTokenAsync(string refreshToken);

    bool VerifyPassword(string password, byte[] passwordHash, byte[] passwordKey);
    
    void EncryptPassword(string password, out byte[] passwordHash, out byte[] passwordKey);
}