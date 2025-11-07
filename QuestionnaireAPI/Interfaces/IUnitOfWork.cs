namespace QuestionnaireAPI.Interfaces;

public interface IUnitOfWork
{
    
    public IUserRepository UserRepository { get; }
    
    //More Repositories will be added here
    
    public Task<bool> SaveChangesAsync();
}