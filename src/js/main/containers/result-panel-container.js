import { connect } from 'react-redux';

import ResultPanel from 'main/components/result-panel/result-panel';

import { getUser } from 'main/actions/main-actions';

export default connect(
    state => ({
        searchUsersInfo: state.mainInfo.get('searchUsersInfo'),
        users: state.users,
    }),
    dispatch => ({
        onGetUser: userName => dispatch(getUser(userName)),
    }),
)(ResultPanel);
