import { handleActions } from 'redux-actions';
import { Record, Map } from 'immutable';

import { changeSearchString, searchUsersSuccess } from 'main/actions/main-actions';

const MainRecord = Record({
    searchUsersInfo: new Map(),
    searchString: '',
    selectedUserId: null,
    isSearchUsersLoading: false,
});

export default handleActions(
    {
        [changeSearchString]: (state, action) =>
            state.set('searchString', action.payload.searchString),

        [searchUsersSuccess]: (state, action) =>
            state.set('searchUsersInfo', action.payload.searchUsers),
    },
    new MainRecord(),
);
