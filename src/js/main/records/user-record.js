import { Record, List } from 'immutable';

const RepositoryRecord = Record({
    id: null,
    name: null,
    description: null,
    issuesCount: null,
});

const UserRecord = Record({
    id: null,
    login: null,
    avatarUrl: null,
    repositories: new List(),
});
