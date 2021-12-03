using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace venus.Models.IRepositories
{
    public interface IProjectRepository 
    {
        IEnumerable<Project> Projects { get; }
        IEnumerable<Bug> Bugs { get; }
        Project GetProject(Guid id);
        IEnumerable<Project> GetProjects();
        Project AddProject(Project project);
        Project UpdateProject(Project project);
        void DeleteProject(Guid id);
        void Save();

    }
}
