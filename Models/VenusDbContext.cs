using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using venus.Models;

namespace venus.Models
{
    public class VenusDbContext : IdentityDbContext<ApplicationUser>
    {
        public VenusDbContext(DbContextOptions<VenusDbContext> options) : base(options) { }

        public DbSet<ApplicationUser> ApplicationUsers { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Connection String");
        }
    }
}