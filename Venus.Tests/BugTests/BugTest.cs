using NUnit.Framework;
using System;
using venus.Models;

namespace Venus.Tests.BugTests
{
    [TestFixture]
    public class BugTest
    {
        [Test]
        public void CanChangeBugSubject()
        {
            var bug = new Bug();

            bug.Subject = "New Bug Title";

            Assert.AreEqual("New Bug Title", bug.Subject);
        }
        [Test]
        public void CanChangeBugCategory()
        {
            var bug = new Bug();

            bug.Category = BugCategory.Performance.ToString();

            Assert.AreEqual(BugCategory.Performance.ToString(), bug.Category);

        }

        [Test]
        public void CanChangeProjectColor()
        {
            var bug = new Bug();

            bug.Severity = BugSeverity.High.ToString();

            Assert.AreEqual(BugSeverity.High.ToString(), bug.Severity);
        }

        [Test]
        public void CanChangeBugStatus()
        {
            var bug = new Bug();

            bug.Status = BugStatus.Completed.ToString();

            Assert.AreEqual(BugStatus.Completed.ToString(), bug.Status);
        }


    }
}
