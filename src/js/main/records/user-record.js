import { Record, List } from 'immutable';

export default Record({
    id: null,
    login: null,
    userName: null,
    avatarUrl: null,
    repositories: new List(),
    isUserInfoLoading: true,
});
