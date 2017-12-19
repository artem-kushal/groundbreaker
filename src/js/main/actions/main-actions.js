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
