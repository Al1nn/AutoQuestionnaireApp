using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore;
using QuestionnaireAPI.Data;
using QuestionnaireAPI.Interfaces;
using QuestionnaireAPI.Models;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;

namespace QuestionnaireAPI.Repos;

public class UserRepository : IUserRepository
{
    private readonly DataContext dc;

    public UserRepository(DataContext dc)
    {
        this.dc = dc;
    }
    
    
    private void EncryptPassword(string password, out byte[] passwordHash, out byte[] passwordKey)
    {
        using (var hmac = new HMACSHA512())
        {
            passwordKey = hmac.Key;
            passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        }
    }

    private bool VerifyPassword(string password, byte[] passwordHash, byte[] passwordKey)
    {
        using (var hmac = new HMACSHA512(passwordKey))
        {
            var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            return computedHash.SequenceEqual(passwordHash);
        }
    }
    
    public async Task<User> Authenticate(string name, string email, string password)
    {
        User user = null;
        
        if (!string.IsNullOrEmpty(name))
        {
            user = await dc.Users.FirstOrDefaultAsync(user => user.Name == name);
        }else if (!string.IsNullOrEmpty(email))
        {
            user = await dc.Users.FirstOrDefaultAsync(user => user.Email == email);
        }
        
        if (user == null)
        {
            return null;
        }
        
        if (!VerifyPassword(password, user.Password, user.PasswordKey))
        {
            return null;
        }
        
        return user;
        
    }

    public void Register(string name, string password, string email, string phoneNumber, string role, IFormFile? file)
    {
       byte[] passwordHash, passwordKey;
       EncryptPassword(password, out passwordHash, out passwordKey);;
        
       User user = new User();
       user.Name = name;
       user.Password = passwordHash;
       user.PasswordKey = passwordKey;
       user.Email = email;
       user.PhoneNumber = phoneNumber;
       user.Role = role; 
       user.Photo = "";
       user.LastUpdatedBy = user.Id;
       
       if (file != null)
       {
           string avatarOriginalDirectory = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "avatars", "original");
           string avatarThumbnailDirectory = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "avatars", "thumbnail");

           if (!Directory.Exists(avatarOriginalDirectory))
           {
               Directory.CreateDirectory(avatarOriginalDirectory);
           }


           if (!Directory.Exists(avatarThumbnailDirectory))
           {
               Directory.CreateDirectory(avatarThumbnailDirectory);
           }

           string uniqueId = Guid.NewGuid().ToString();
           string fileName = $"{uniqueId}_{file.FileName}";

           var originalPath = Path.Combine(avatarOriginalDirectory, fileName);
           var thumbnailPath = Path.Combine(avatarThumbnailDirectory, fileName);
           

           using (var fileStream = new FileStream(originalPath, FileMode.Create))
           {
               file.CopyTo(fileStream);
           }

           using (var thumbnail = Image.Load(originalPath))
           {
               var resizeOptions = new ResizeOptions
               {
                   Mode = ResizeMode.Crop,
                   Size = new Size(250, 250),
                   Position = AnchorPositionMode.Center
               };

               thumbnail.Mutate(x => x.Resize(resizeOptions));
               thumbnail.Save(thumbnailPath);
           }
           
           user.Photo = fileName;
       }
       
       dc.Users.Add(user);
    }

  

    public async Task<bool> UserAlreadyExists(string name)
    {
        return await dc.Users.AnyAsync(user => user.Name == name);
    }

    public async Task<User> FindUserByIdAsync(int id)
    {
        return await dc.Users.FirstOrDefaultAsync(user => user.Id == id);
    }
}