import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';

import Avatar from 'material-ui/Avatar';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

import './user-detail-dialog.scss';

export default class UserDetailDialog extends React.PureComponent {
    static propTypes = {
        isOpen: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired,

        userName: PropTypes.string,
        avatarUrl: PropTypes.string,
        repositories: PropTypes.instanceOf(List),

        isUserInfoLoading: PropTypes.bool,
    };

    static defaultProps = {
        avatarUrl: '',
        userName: '',
        repositories: new List(),

        isUserInfoLoading: true,
    };

    render() {
        const actions = [<FlatButton label="Cancel" primary onClick={this.props.onClose} />];
        const { repositories } = this.props;

        return (
            <Dialog
                title={this.props.userName}
                actions={actions}
                modal={false}
                open={this.props.isOpen}
                className="user-detail-dialog"
            >
                {this.props.isUserInfoLoading ? (
                    <div className="user-detail-dialog__spinner-container">
                        <CircularProgress size={60} thickness={7} />
                    </div>
                ) : (
                    <div>
                        <Avatar src={this.props.avatarUrl} size={100} />
                        {repositories.isEmpty() ? (
                            <div>Have no repositories</div>
                        ) : (
                            <Table>
                                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                    <TableRow>
                                        <TableHeaderColumn>Repo Name</TableHeaderColumn>
                                        <TableHeaderColumn>Description</TableHeaderColumn>
                                        <TableHeaderColumn>Number of issues</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false}>
                                    {repositories.toArray().map(repo => (
                                        <TableRow key={repo.get('id')}>
                                            <TableRowColumn>{repo.get('name')}</TableRowColumn>
                                            <TableRowColumn>
                                                {repo.get('description')}
                                            </TableRowColumn>
                                            <TableRowColumn className="user-detail-dialog__issue-table-row">
                                                {repo.get('isCountIssuesLoading') ? (
                                                    <CircularProgress size={25} />
                                                ) : (
                                                    repo.get('issuesCount')
                                                )}
                                            </TableRowColumn>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </div>
                )}
            </Dialog>
        );
    }
}
