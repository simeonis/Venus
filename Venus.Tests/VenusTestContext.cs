using Microsoft.EntityFrameworkCore;
using System;
using venus.Models;

namespace Venus.Tests
{
    public class VenusTestContext 
    {
        //Initialize db context from main project
        public VenusTestContext(DbContextOptions<VenusDbContext> ctxOptions)
        {
            dbOptions = ctxOptions;
            SeedData();
        }

        public DbContextOptions<VenusDbContext> dbOptions { get; }
        
        //Data to initialize Sqlite database to use for testing
        private void SeedData()
        {
            using (var context = new VenusDbContext(dbOptions))
            {
                context.Database.EnsureDeleted();
                context.Database.EnsureCreated();

                var proj1 = new Project(title: "Project 1", description: "Description 1", color: "Red", Guid.NewGuid());
               

                Bug bug1 = new Bug();
                Bug bug2 = new Bug();
                Bug bug3 = new Bug();
                Bug bug4 = new Bug();
                Bug bug5 = new Bug();

                bug1.Subject = "proj bug";
                bug2.Subject = "proj bug";
                bug3.Subject = "proj bug";
                bug4.Subject = "proj bug";
                bug5.Subject = "proj bug";

                proj1.Bugs.Add(bug1);
                proj1.Bugs.Add(bug2);
                proj1.Bugs.Add(bug3);
                proj1.Bugs.Add(bug4);
                proj1.Bugs.Add(bug5);


                context.Add(proj1);
                context.SaveChanges();

            }
            }
        }
    }

