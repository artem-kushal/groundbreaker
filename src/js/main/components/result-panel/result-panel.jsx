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

import UserDetailsDialog from 'main/components/user-detail-dialog/user-detail-dialog';

import './result-panel.scss';

export default class ResultPanel extends React.PureComponent {
    static propTypes = {
        searchUsersInfo: PropTypes.instanceOf(Map).isRequired,
        users: PropTypes.instanceOf(Map).isRequired,
        onGetUser: PropTypes.func.isRequired,
    };

    state = {
        isUserDetailDialogOpened: false,
        selectedUserId: null,
    };

    onHandleCloseDialog = () =>
        this.setState({
            isUserDetailDialogOpened: false,
        });

    onTableCellClick = (user) => {
        this.props.onGetUser(user.get('login'));
        this.setState({
            isUserDetailDialogOpened: true,
            selectedUserId: user.get('id'),
        });
    };

    render() {
        const { searchUsersInfo, users } = this.props;
        const { selectedUserId } = this.state;

        return (
            <Paper zDepth={1} className="result-panel">
                {searchUsersInfo.isEmpty() ? (
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
                            {searchUsersInfo.toArray().map(user => (
                                <TableRow key={user.get('id')}>
                                    <TableRowColumn>
                                        <Avatar
                                            src={user.get('avatarUrl')}
                                            size={100}
                                            onClick={() => this.onTableCellClick(user)}
                                            className="result-panel__user-avatar"
                                        />
                                    </TableRowColumn>
                                    <TableRowColumn>{user.get('login')}</TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
                <UserDetailsDialog
                    isOpen={this.state.isUserDetailDialogOpened}
                    onClose={this.onHandleCloseDialog}
                    userName={users.getIn([selectedUserId, 'userName'])}
                    login={users.getIn([selectedUserId, 'login'])}
                    avatarUrl={users.getIn([selectedUserId, 'avatarUrl'])}
                    repositories={users.getIn([selectedUserId, 'repositories'])}
                    isUserInfoLoading={users.getIn([selectedUserId, 'isUserInfoLoading'])}
                />
            </Paper>
        );
    }
}
