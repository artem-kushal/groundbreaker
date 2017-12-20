import React from 'react';
import PropTypes from 'prop-types';

import Snackbar from 'material-ui/Snackbar';

import ErrorRecord from 'main/records/error-record';

const SnackbarBodyStyles = {
    padding: '10px 24px',
    height: 'auto',
    lineHeight: '16px',
};

export default class ErrorSnackBar extends React.PureComponent {
    static propTypes = {
        error: PropTypes.instanceOf(ErrorRecord),
    };

    static defaultProps = {
        error: null,
    };

    render() {
        const { error } = this.props;

        return (
            error && (
                <Snackbar
                    open
                    message={`Error code: ${error.get('errorCode')}. Message: ${error.get('message')}.`}
                    autoHideDuration={4000}
                    bodyStyle={SnackbarBodyStyles}
                />
            )
        );
    }
}
