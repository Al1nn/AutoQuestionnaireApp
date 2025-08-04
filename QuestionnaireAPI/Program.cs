

using Microsoft.EntityFrameworkCore;
using QuestionnaireAPI.Data;
using QuestionnaireAPI.Interfaces;
using QuestionnaireAPI.Repos;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.AddDbContext<DataContext>(options =>
options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();


var app = builder.Build();








app.UseSwagger();

app.UseSwaggerUI();

app.UseRouting();

app.UseFileServer();

app.UseHsts();

app.UseHttpsRedirection();

app.UseCors(m => m.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());


app.UseDefaultFiles();

app.UseStaticFiles();

app.MapControllers();


app.Run();



record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
