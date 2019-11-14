import React, { Component } from 'react';
import './Users.scss';

import Button from '../Buttons/Button';
import AddUsers from './AddUsers';
import axios from 'axios';

class Users extends Component {
    constructor (props) {
        super(props)
        this.state = {
            users: [],
            add: false
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
                add: false
            })
        })
    }


    render () {
        const { users, add } = this.state;
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
                                                <a href="#"><i className="fas fa-times-circle text-danger fa-lg"></i></a>
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
                        {add && <AddUsers formSuccess={this.handleFormSuccess}/>}
                    </div>
                </div>
            </section>
        )
    }
}

export default Users
