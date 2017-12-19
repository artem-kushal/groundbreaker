import axios from 'axios';

const QUERY_HOST_URL = 'https://api.github.com';

axios.defaults.baseURL = QUERY_HOST_URL;
axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const searchUsers = userName => axios.get(`/search/users?q=${userName}+in:login&type=user`);
export const getUser = userName => axios.get(`/users/${userName}`);
export const getRepos = userName => axios.get(`/users/${userName}/repos`);
export const getIssues = (userName, repoName) => axios.get(`/users/${userName}/${repoName}/issues`);
