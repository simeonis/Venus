using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace venus.Models
{
    public class VenusDbContext : IdentityDbContext<ApplicationUser>
    {
        public VenusDbContext(DbContextOptions<VenusDbContext> options) : base(options) { }

        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<Bug> Bugs { get; set; }
        public DbSet<Project> Projects { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=VenusDb;MultipleActiveResultSets=True;Trusted_Connection=True",
                o => o.UseQuerySplittingBehavior(QuerySplittingBehavior.SingleQuery));
            }
        }
    }
}