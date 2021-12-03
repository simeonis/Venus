
const baseUrl = 'https://localhost:5001/api';

export const ApiUrls = {
    login: `${baseUrl}/account/login`,
    register: `${baseUrl}/account/register`,
    getUser: `${baseUrl}/account/user`,
    logOut: `${baseUrl}/account/logout`,
    getProjectMembers: `${baseUrl}/project/members`,
    addUserToProject: `${baseUrl}/project/adduser`
}
