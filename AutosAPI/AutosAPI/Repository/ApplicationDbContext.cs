using AutosAPI.Model;
using Microsoft.EntityFrameworkCore;
namespace AutosAPI.Repository
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public DbSet<Auto> Auto { get; set; }
    }
}
