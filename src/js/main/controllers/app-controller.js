import axios from 'axios';
import { Map } from 'immutable';

import UserSearchRecord from 'main/records/user-search-record';

const QUERY_HOST_URL = 'https://api.github.com';

axios.defaults.baseURL = QUERY_HOST_URL;
axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const fetchSearchUsers = userName =>
    new Promise((resolve, reject) => {
        axios.get(`/search/users?q=${userName}+in:login&type=user`).then(
            ({ data }) => {
                resolve(new Map(data.items.map(item => [
                    item.id,
                    new UserSearchRecord({
                        id: item.id,
                        login: item.login,
                        avatarUrl: item.avatar_url,
                    }),
                ])));
            },
            error => reject(error),
        );
    });

export const fetchGetUser = userName => axios.get(`/users/${userName}`);
export const fetchGetRepos = userName => axios.get(`/users/${userName}/repos`);
export const fetchGetIssues = (userName, repoName) =>
    axios.get(`/users/${userName}/${repoName}/issues`);
