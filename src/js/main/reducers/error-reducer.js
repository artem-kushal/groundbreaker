import { handleActions } from 'redux-actions';
import { Record } from 'immutable';

import { requestError } from 'main/actions/main-actions';

import ErrorRecord from 'main/records/error-record';

const StateRecord = Record({
    error: null,
});

export default handleActions(
    {
        [requestError]: (state, action) =>
            state.set(
                'error',
                new ErrorRecord({
                    errorCode: action.payload.errorCode,
                    message: action.payload.message,
                }),
            ),
    },
    new StateRecord(),
);
