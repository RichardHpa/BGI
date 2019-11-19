import React, { Component } from 'react';
import './Users.scss';

import Button from '../Buttons/Button';
import AddUsers from './AddUsers';
import Delete from '../Delete/Delete';

import axios from 'axios';

class Users extends Component {
    constructor (props) {
        super(props)
        this.state = {
            users: [],
            add: false,
            deleting: false
        }
    }

    componentDidMount () {
        axios.get('/api/users').then(response => {
            this.setState({
                users: response.data
            })
        })
    }

    openModal = () => {
        this.setState({
            add: !this.state.add
        })
    }

    handleFormSuccess = () => {
        axios.get('/api/users').then(response => {
            this.setState({
                users: response.data,
                add: false,
                deleting: null
            })
        })
    }

    toggleDelete = (user) => {
        this.setState({
            deleting: user
        })
    }

    render () {
        const { users, add, deleting } = this.state;
        return (
            <section>
                <div className="row">
                    <div className="col">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Name</th>
            						<th>Email</th>
            						<th>Role</th>
            						<th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((user, i) => (
                                        <tr key={i}>
                                            <td className="align-middle d-flex align-items-center">
                                                <i className="fas fa-user-circle fa-3x pr-2"></i> {user['name']}
                                            </td>
                                            <td className="align-middle">{user['email']}</td>
                                            <td className="align-middle">{user['role']}</td>
                                            <td className="align-middle">
                                                <a href="#"><i className="fas fa-cog fa-lg pr-2"></i></a>
                                                <a href="#" onClick={this.toggleDelete.bind(this, user)}><i className="fas fa-times-circle text-danger fa-lg"></i></a>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Button btnText="Add New User" btnClicked={this.openModal}/>
                    </div>
                </div>
                {add && <AddUsers formSuccess={this.handleFormSuccess}/>}

                {deleting && <Delete id={deleting['id']} title={deleting['name']} route="users" formSuccess={this.handleFormSuccess}/>}
            </section>
        )
    }
}

export default Users
