namespace QuestionnaireAPI.Interfaces;

public interface IUnitOfWork
{
    
    public IUserRepository UserRepository { get; }
    
    public Task<bool> SaveChangesAsync();
}