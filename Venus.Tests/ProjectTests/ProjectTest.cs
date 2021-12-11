using NUnit.Framework;
using System;
using venus.Models;

namespace Venus.Tests
{
    [TestFixture]
    public class ProjectTest
    {
        [Test]
        public void CanChangeProjectTitle()
        {
            var proj = new Project(title: "Test Title", description: "Test Description", color: "Red", ownerId: Guid.NewGuid());
            proj.Title = "New Title";
            Assert.AreEqual("New Title", proj.Title);
        }

        [Test]
        public void CanChangeProjectDescription()
        {
            var proj = new Project(title: "Test Title", description: "Test Description", color: "Red", ownerId: Guid.NewGuid());
            proj.Description = "New Description";
            Assert.AreEqual("New Description", proj.Description);

        }

        [Test]
        public void CanChangeProjectColor()
        {
            var proj = new Project(title: "Test Title", description: "Test Description", color: "Red", ownerId: Guid.NewGuid());
            proj.Color = "Blue";
            Assert.AreEqual("Blue", proj.Color);
        }
    }
}

