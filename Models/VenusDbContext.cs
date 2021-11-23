using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using venus.Models;
using Microsoft.EntityFrameworkCore.Design;

namespace venus.Models
{
    public class VenusDbContext : IdentityDbContext<ApplicationUser>
    {
        public VenusDbContext(DbContextOptions<VenusDbContext> options) : base(options) { }

        public DbSet<ApplicationUser> ApplicationUsers { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

            optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=VenusDb;MultipleActiveResultSets=True;Trusted_Connection=True");
        }
    }
}