import { handleActions } from 'redux-actions';
import { Record } from 'immutable';

import { changeSearchString } from 'main/actions/main-actions';

const UserSearchRecord = Record({
    id: null,
    login: null,
    avatarUrl: null,
});

const MainRecord = Record({
    users: new Map(),
    searchString: '',
    selectedUserId: null,
    isSearchUsersLoading: false,
});

export default handleActions(
    {
        [changeSearchString]: (state, action) =>
            state.set('searchString', action.payload.searchString),
    },
    new MainRecord(),
);
