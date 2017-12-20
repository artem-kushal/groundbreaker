import React from 'react';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import SearchFormContainer from 'main/containers/search-form-container';
import ResultPanelContainer from 'main/containers/result-panel-container';
import ErrorSnackBarContainer from 'main/containers/snackbar-container';

import * as appReducers from 'main/reducers';

const reducer = combineReducers(appReducers);
const store = createStore(reducer, applyMiddleware(thunk));

export default () => (
    <Provider store={store}>
        <MuiThemeProvider>
            <div className="page-container">
                <SearchFormContainer />
                <ResultPanelContainer />
                <ErrorSnackBarContainer />
            </div>
        </MuiThemeProvider>
    </Provider>
);
