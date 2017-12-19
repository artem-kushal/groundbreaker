import { handleActions } from 'redux-actions';
import { Map } from 'immutable';

import { getUserSuccess, getIssuesSuccess } from 'main/actions/main-actions';

export default handleActions(
    {
        [getUserSuccess]: (state, action) => {
            const { userInfo, reposInfo } = action.payload;

            return state.set(userInfo.get('id'), userInfo.set('repositories', reposInfo));
        },
        [getIssuesSuccess]: (state, action) => {
            const { userId, repoName, ussuesCount } = action.payload;

            return state.updateIn([userId, 'repositories'], (repositories) => {
                const indexToUpdate = repositories.findIndex(r => r.get('name') === repoName);

                return repositories.update(indexToUpdate, item =>
                    item.set('issuesCount', ussuesCount).set('isCountIssuesLoading', false));
            });
        },
    },
    new Map(),
);
