import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import './search-form.scss';

const btnStyle = {
    height: 52,
    width: 120,
    marginTop: 10,
};

export default class SearchForm extends React.PureComponent {
    static propTypes = {
        searchString: PropTypes.string.isRequired,
        onChangeSearchString: PropTypes.func.isRequired,
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
                <RaisedButton style={btnStyle} label="Search" primary />
            </Paper>
        );
    }
}
