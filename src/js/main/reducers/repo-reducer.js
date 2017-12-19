import { handleActions } from 'redux-actions';
import { Record, List } from 'immutable';

import { searchUsers } from 'main/actions/main-actions';

const RepositoryRecord = Record({
    id: null,
    userId: null,
    name: null,
    description: null,
    issuesCount: null,
    isRepoLoading: false,
    isIssueCountLoading: false,
});

export default handleActions(
    {
        [searchUsers]: (state, action) => ({
            counter: state.counter + action.payload,
        }),
    },
    new Map(),
);
