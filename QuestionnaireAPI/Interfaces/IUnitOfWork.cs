namespace QuestionnaireAPI.Interfaces;

public interface IUnitOfWork
{
    
    public IUserRepository UserRepository { get; }
    
    public IQuestionnaireRepository QuestionnaireRepository { get; }
    
    public IAdminRepository AdminRepository { get; }
    
    
    //More Repositories will be added here
    
    
    
    public Task<bool> SaveChangesAsync();
}