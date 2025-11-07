using QuestionnaireAPI.Configurations;
using QuestionnaireAPI.Data;
using QuestionnaireAPI.Interfaces;
using QuestionnaireAPI.Repos.ServiceRepos;
using QuestionnaireAPI.Services;

namespace QuestionnaireAPI.Repos;

public class UnitOfWork : IUnitOfWork
{
    public readonly DataContext dc;
    
    
    public UnitOfWork(DataContext dc)
    {
        this.dc = dc;
    }
    
    public IUserRepository UserRepository => new UserRepository(dc);

    public IQuestionnaireRepository QuestionnaireRepository => new QuestionnaireRepository(dc);

    //More repositories will be added here

    public async Task<bool> SaveChangesAsync()
    {
        return await dc.SaveChangesAsync() > 0;
    }
}