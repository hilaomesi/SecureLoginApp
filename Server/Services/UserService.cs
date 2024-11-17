using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Server.Models;

namespace Server.Services
{
    public class UserService
    {
        private readonly string _filePath;

        public UserService(IConfiguration configuration)
        {
            _filePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "users.json");
        }

        public List<User> GetAllUsers()
        {
            var json = File.ReadAllText(_filePath);
            return JsonConvert.DeserializeObject<List<User>>(json);
        }

        public User GetUserByUsername(string username)
        {
            var users = GetAllUsers();
            return users.FirstOrDefault(u => u.Username == username);
        }

        public void AddUser(User user)
        {
            var users = GetAllUsers();
            users.Add(user);
            File.WriteAllText(_filePath, JsonConvert.SerializeObject(users, Formatting.Indented));
        }
    }
}
