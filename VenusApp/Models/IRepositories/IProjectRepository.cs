using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace venus.Models.IRepositories
{
    public interface IProjectRepository 
    {
        IEnumerable<Project> Projects { get; }
        Project GetProject(Guid id);
        Project GetProjectNoTrack(Guid id);
        IEnumerable<Project> GetProjects(string id);
        Project AddProject(Project project);
        Project UpdateProject(Project project);
        void DeleteProject(Guid id);
        void Save();
        bool IsInProject(Guid projId, Guid userId);
    }
}
