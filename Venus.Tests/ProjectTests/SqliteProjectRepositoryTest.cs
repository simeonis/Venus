using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using venus.Models;
using NUnit.Framework;
using venus.Models.EFRepositories;

namespace Venus.Tests
{
    [TestFixture]
    public class SqliteProjectRepositoryTest : VenusTestContext
    {
        //Setting context to virtual sqlite database to test on
        public SqliteProjectRepositoryTest()
            : base(new DbContextOptionsBuilder<VenusDbContext>()
                  .UseSqlite("Filename=Test.db")
                  .Options){}


        //Testing ability to get projects from server
        [Test, Order(1)]
        public void CanGetProjects()
        {
            using (var context = new VenusDbContext(dbOptions))
            {
                var projRepo = new EFProjectRepository(context);

                var projects = projRepo.Projects.ToList();

                Assert.AreEqual(1, projects.Count);
             }
        }

        //Testing ability to get a single project based on an id from the server
        [Test, Order(2)]
        public void CanGetProject()
        {
            using (var context = new VenusDbContext(dbOptions))
            {
                var projRepo = new EFProjectRepository(context);
                var projects = projRepo.Projects.ToList();

                var project = projRepo.GetProject(projects[0].ID);

                Assert.AreEqual(project, projects[0]);
            }
        }

        //Testing ability to add a project to the database
        [Test, Order(3)]
        public void CanAddProject()
        {
            using (var context = new VenusDbContext(dbOptions))
            {
                var projRepo = new EFProjectRepository(context);
                var proj = new Project(title: "Project new", description: "Description new ", color: "Blue", Guid.NewGuid());

                var project = projRepo.AddProject(proj);
            }
            using (var context = new VenusDbContext(dbOptions))
            {
                var projRepo = new EFProjectRepository(context);
                var projects = projRepo.Projects.ToList();
                Assert.AreEqual(2, projects.Count);
            }
        }

        //Testing ability to update a project in the database
        [Test, Order(4)]
        public void CanUpdateProject()
        {
            using (var context = new VenusDbContext(dbOptions))
            {
                var repo = new EFProjectRepository(context);

                var projects = repo.Projects.ToList();

                var oldTitle = projects[0].Title;
                var oldDescription = projects[0].Description;
                var oldColor = projects[0].Color;

                projects[0].Title = "Updated Title";
                projects[0].Description = "Updated Description";
                projects[0].Color = "Purple";

                var project = repo.UpdateProject(projects[0]);

                Assert.AreEqual("Updated Title", projects[0].Title);
                Assert.AreEqual("Updated Description", projects[0].Description);
                Assert.AreEqual("Purple", projects[0].Color);
            }
        }

        [Test, Order(5)]
        //Testing ability to delete a project from the server
        public void CanDeleteProject()
        {
            using (var context = new VenusDbContext(dbOptions))
            {
                var projRepo = new EFProjectRepository(context);
                var projects = projRepo.Projects.ToList();

                projRepo.DeleteProject(projects[0].ID);
            }
            using (var context = new VenusDbContext(dbOptions))
            {
                var projRepo = new EFProjectRepository(context);
                var projects = projRepo.Projects.ToList();
                Assert.AreEqual(1, projects.Count());
            }

        }
    }


}
