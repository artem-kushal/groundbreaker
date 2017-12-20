import { connect } from 'react-redux';

import SearchForm from 'main/components/search-form/search-form';

import { changeSearch, resetSearch } from 'main/actions/main-actions';

export default connect(
    state => ({
        searchString: state.mainInfo.get('searchString'),
    }),
    dispatch => ({
        onChangeSearchString: searchString => dispatch(changeSearch(searchString)),
        onResetSearch: () => dispatch(resetSearch()),
    }),
)(SearchForm);
