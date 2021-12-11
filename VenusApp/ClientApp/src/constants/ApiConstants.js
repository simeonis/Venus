const baseUrl = `https://localhost:5001/api`;

export const ApiUrls = {
    login: `${baseUrl}/account/login`,
    register: `${baseUrl}/account/register`,
    getUser: `${baseUrl}/account/user`,
    logOut: `${baseUrl}/account/logout`,
    getProjectMembers: `${baseUrl}/project/get-members`,
    addUserToProject: `${baseUrl}/project/add-user`,
    removeUserFromProject: `${baseUrl}/project/remove-user`,
    bug: `${baseUrl}/bug`,
    projectBug: `${baseUrl}/bug/project`,
    project: `${baseUrl}/project`,
    getAllProjects: `${baseUrl}/project/get-all`,
    searchUser: `${baseUrl}/user/search`,
    getUsername: `${baseUrl}/user/username`
}
