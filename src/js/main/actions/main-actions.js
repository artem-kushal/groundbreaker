import { createAction } from 'redux-actions';

export const searchUsers = createAction('SEARCH_USERS');
export const changeSearchString = createAction(
    'CHANGE_SEARCH_STRING',
    searchString => searchString,
);
