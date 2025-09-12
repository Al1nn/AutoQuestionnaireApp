using System.Security.Claims;
using QuestionnaireAPI.Models;

namespace QuestionnaireAPI.Services;

public interface ITokenService
{
    string GenerateAccessToken(User user); 
    string GenerateRefreshToken();
    ClaimsPrincipal GetPrincipalFromExpiredToken(string token); 
}