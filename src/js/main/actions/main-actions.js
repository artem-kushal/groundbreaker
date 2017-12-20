import { createAction } from 'redux-actions';

import Delay from 'main/tools/delay-tools';

import {
    fetchSearchUsers,
    fetchGetUser,
    fetchGetRepos,
    fetchGetIssues,
} from 'main/controllers/app-controller';

const delay = new Delay();

export const requestError = createAction('REQUIEST_ERROR', (errorCode, message) => ({
    errorCode,
    message,
}));

export const searchUsersSuccess = createAction('SEARCH_USERS_SUCCESS', searchUsers => ({
    searchUsers,
}));

export const searchUsers = searchString => (dispatch, getState) =>
    fetchSearchUsers(searchString).then(
        (users) => {
            if (getState().mainInfo.get('searchString')) {
                dispatch(searchUsersSuccess(users));
            }
        },
        ({ data, status }) => dispatch(requestError(status, data.message)),
    );

export const changeSearchString = createAction('CHANGE_SEARCH_STRING', searchString => ({
    searchString,
}));

export const resetSearch = createAction('RESET_SEARCH');

export const changeSearch = searchString => (dispatch) => {
    dispatch(changeSearchString(searchString));
    if (searchString) {
        delay.start(() => dispatch(searchUsers(searchString), 1000));
    } else {
        dispatch(resetSearch());
    }
};

export const getIssuesSuccess = createAction(
    'GET_ISSUES_SUCCESS',
    (userId, repoName, ussuesCount) => ({
        userId,
        repoName,
        ussuesCount,
    }),
);

export const getIssues = (userId, userName, repoName) => (dispatch, getState) =>
    fetchGetIssues(userName, repoName).then(
        (ussuesCount) => {
            if (getState().mainInfo.get('searchString')) {
                dispatch(getIssuesSuccess(userId, repoName, ussuesCount));
            }
        },
        ({ data, status }) => dispatch(requestError(status, data.message)),
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
        ({ data, status }) => dispatch(requestError(status, data.message)),
    );
