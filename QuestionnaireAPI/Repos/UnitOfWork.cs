using QuestionnaireAPI.Data;
using QuestionnaireAPI.Interfaces;

namespace QuestionnaireAPI.Repos;

public class UnitOfWork : IUnitOfWork
{
    public readonly DataContext dc;
    
    public UnitOfWork(DataContext dc)
    {
        this.dc = dc;
    }
    
    public IUserRepository UserRepository => new UserRepository(dc);


    public async Task<bool> SaveChangesAsync()
    {
        return await dc.SaveChangesAsync() > 0;
    }
}