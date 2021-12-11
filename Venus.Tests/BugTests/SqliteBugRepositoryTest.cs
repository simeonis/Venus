using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System;
using System.Linq;
using venus.Models;
using venus.Models.EFRepositories;

namespace Venus.Tests
{
    [TestFixture]
    public class SqliteBugRepositoryTest : VenusTestContext
    {
        public SqliteBugRepositoryTest()
            : base(
                  new DbContextOptionsBuilder<VenusDbContext>()
                  .UseSqlite("Filename=Test.db")
                  .Options)
        { }

        //Testing ability to get all bugs from a project
        [Test, Order(1)]
        public void CanGetBugs()
        {
            using (var context = new VenusDbContext(dbOptions))
            {
                var projectRepo = new EFProjectRepository(context);
                var bugRepo = new EFBugRepository(context);

                var project = projectRepo.Projects.ToList().Where(p => p.Title == "Project 1");
                var bugs = bugRepo.GetBugs(project.FirstOrDefault().ID);

                Assert.AreEqual(5, bugs.Count());
            }

        }

        //Testing ability to get one bug from a project in the database
        [Test, Order(2)]
        public void CanGetBug()
        {
            using (var context = new VenusDbContext(dbOptions))
            {
                var projectRepo = new EFProjectRepository(context);
                var bugRepo = new EFBugRepository(context);

                var projects = projectRepo.Projects.ToList();
                Console.WriteLine(projects[0].ID);
                var bug = bugRepo.GetBug(projects[0].Bugs.FirstOrDefault().ID);

            }
            using (var context = new VenusDbContext(dbOptions))
            {
                var projectRepo = new EFProjectRepository(context);
                var bugRepo = new EFBugRepository(context);

                var projects = projectRepo.Projects.ToList();
                var bug = bugRepo.GetBug(projects[0].Bugs.FirstOrDefault().ID);

                Assert.AreEqual("proj bug", bug.Subject);
            }

        }

        //Testing ability to add a bug to a project in the database
        [Test, Order(3)]
        public void CanAddBug()
        {
            using (var context = new VenusDbContext(dbOptions))
            {
                var projectRepo = new EFProjectRepository(context);
                var bugRepo = new EFBugRepository(context);

                BugDto newBug = new BugDto();

                var projects = projectRepo.Projects.ToList();
                newBug.ProjectID = projects[0].ID;

                bugRepo.AddBug(newBug);

            }
            using (var context = new VenusDbContext(dbOptions))
            {
                var projectRepo = new EFProjectRepository(context);
                var bugRepo = new EFBugRepository(context);

                var projects = projectRepo.Projects.ToList();

                Assert.AreNotEqual(2, projects.Count());

            }

        }

        //testing ability to delete a bug from project in the database
        [Test, Order(4)]
        public void CanDeleteBug()
        {
            using (var context = new VenusDbContext(dbOptions))
            {
                var projRepo = new EFProjectRepository(context);
                var bugRepo = new EFBugRepository(context);

                var projects = projRepo.Projects.ToList();
                var countBeforeDelete = projects[0].Bugs.Count();

                bugRepo.DeleteBug(projects[0].Bugs[0].ID);
                var countAfterDelete = projects[0].Bugs.Count();

                Assert.AreNotEqual(countBeforeDelete, countAfterDelete);
            }
        }

    }



}
