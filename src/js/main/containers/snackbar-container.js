import { connect } from 'react-redux';

import ErrorSnackbar from 'main/components/error-snackbar/error-snackbar';

export default connect(state => ({
    error: state.error.get('error'),
}))(ErrorSnackbar);
