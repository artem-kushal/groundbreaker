import { connect } from 'react-redux';

import ResultPanel from 'main/components/result-panel/result-panel';

import { changeSearchString } from 'main/actions/main-actions';

export default connect(
    state => ({
        users: state.mainInfo.get('users'),
    }),
    dispatch => ({
        onChangeSearchString: searchString => dispatch(changeSearchString(searchString)),
    }),
)(ResultPanel);
