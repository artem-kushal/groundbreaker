import React from 'react';
import Paper from 'material-ui/Paper';

import './result-panel.scss';

export default class ResultPanel extends React.PureComponent {
    render() {
        return (
            <Paper zDepth={1} className="result-panel">
                <p>Results panel</p>
            </Paper>
        );
    }
}
