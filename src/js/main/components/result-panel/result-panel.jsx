import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

import './result-panel.scss';

export default class ResultPanel extends React.PureComponent {
    static propTypes = {
        users: PropTypes.instanceOf(Map).isRequired,
    };

    render() {
        const { users } = this.props;

        return (
            <Paper zDepth={1} className="result-panel">
                {users.isEmpty() ? (
                    <p>No results</p>
                ) : (
                    <Table>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn>Avatar</TableHeaderColumn>
                                <TableHeaderColumn>Name</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {users.toArray().map(user => (
                                <TableRow key={user.get('id')}>
                                    <TableRowColumn>
                                        <Avatar src={user.get('avatarUrl')} size={100} />
                                    </TableRowColumn>
                                    <TableRowColumn>{user.get('login')}</TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </Paper>
        );
    }
}
