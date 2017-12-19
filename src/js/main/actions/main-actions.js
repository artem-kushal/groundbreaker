import { createAction } from 'redux-actions';

import {
    fetchSearchUsers,
    fetchGetUser,
    fetchGetRepos,
    fetchGetIssues,
} from 'main/controllers/app-controller';

export const changeSearchString = createAction('CHANGE_SEARCH_STRING', searchString => ({
    searchString,
}));

export const searchUsersSuccess = createAction('SEARCH_USERS_SUCCESS', searchUsers => ({
    searchUsers,
}));

const requestError = createAction('REQUIEST_ERROR');

export const searchUsers = searchString => dispatch =>
    fetchSearchUsers(searchString).then(
        users => dispatch(searchUsersSuccess(users)),
        error => dispatch(requestError(error)),
    );

export const getIssuesSuccess = createAction(
    'GET_ISSUES_SUCCESS',
    (userId, repoName, ussuesCount) => ({
        userId,
        repoName,
        ussuesCount,
    }),
);

export const getIssues = (userId, userName, repoName) => dispatch =>
    fetchGetIssues(userName, repoName).then(
        ussuesCount => dispatch(getIssuesSuccess(userId, repoName, ussuesCount)),
        error => dispatch(requestError(error)),
    );

export const getUserSuccess = createAction('GET_USER_SUCCESS', (userInfo, reposInfo) => ({
    userInfo,
    reposInfo,
}));

export const getUser = userName => dispatch =>
    Promise.all([fetchGetUser(userName), fetchGetRepos(userName)]).then(
        ([userInfo, reposInfo]) => {
            dispatch(getUserSuccess(userInfo, reposInfo));

            reposInfo.forEach((repoInfo) => {
                dispatch(getIssues(userInfo.get('id'), userInfo.get('login'), repoInfo.get('name')));
            });
        },
        error => dispatch(requestError(error)),
    );
