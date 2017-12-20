import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

import './search-form.scss';

const ESC_KEY_CODE = 27;

export default class SearchForm extends React.PureComponent {
    static propTypes = {
        searchString: PropTypes.string.isRequired,
        onChangeSearchString: PropTypes.func.isRequired,
        onResetSearch: PropTypes.func.isRequired,
    };

    componentWillMount() {
        document.body.addEventListener('keydown', this.onKeyDown);
    }

    componentWillUnmount() {
        document.body.removeEventListener('keydown', this.onKeyDown);
    }

    onKeyDown = (e) => {
        if (e.keyCode === ESC_KEY_CODE) {
            this.props.onResetSearch();
        }
    };

    onChangeSearchString = (e, val) => this.props.onChangeSearchString(val);

    render() {
        return (
            <Paper zDepth={1} className="search-form">
                <h2 className="search-form__title">Github Browser</h2>
                <TextField
                    className="search-form__input"
                    hintText="Enter github user name"
                    floatingLabelText="Search"
                    floatingLabelFixed
                    onChange={this.onChangeSearchString}
                    value={this.props.searchString}
                />
            </Paper>
        );
    }
}
