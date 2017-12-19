import axios from 'axios';
import { Map, List } from 'immutable';

import UserSearchRecord from 'main/records/user-search-record';
import UserRecord from 'main/records/user-record';
import RepositoryRecord from 'main/records/repo-record';

const QUERY_HOST_URL = 'https://api.github.com';
const AUTH_TOKEN = '';

axios.defaults.baseURL = QUERY_HOST_URL;
axios.defaults.headers.common.Authorization = `token ${AUTH_TOKEN}`;
axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const fetchSearchUsers = userName =>
    axios.get(`/search/users?q=${userName}+in:login&type=user`).then(
        ({ data }) =>
            new Map(data.items.map(item => [
                item.id,
                new UserSearchRecord({
                    id: item.id,
                    login: item.login,
                    avatarUrl: item.avatar_url,
                }),
            ])),
        error => error,
    );

export const fetchGetUser = userName =>
    axios.get(`/users/${userName}`).then(
        ({ data }) =>
            new UserRecord({
                id: data.id,
                login: data.login,
                userName: data.name,
                avatarUrl: data.avatar_url,
                isUserInfoLoading: false,
            }),
        error => error,
    );

export const fetchGetRepos = userName =>
    axios.get(`/users/${userName}/repos`).then(
        ({ data }) =>
            new List(data.map(item =>
                new RepositoryRecord({
                    id: item.id,
                    name: item.name,
                    description: item.description,
                }))),
        error => error,
    );

export const fetchGetIssues = (userName, repoName) =>
    axios
        .get(`/repos/${userName}/${repoName}/issues`)
        .then(({ data }) => data.length, error => error);
