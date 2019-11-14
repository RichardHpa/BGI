import React, { Component } from 'react';
import './Users.scss';
import Button from '../Buttons/Button';

class Users extends Component {
    constructor (props) {
        super(props)
        this.state = {

        }
    }

    render () {
        return (
            <section>
                <div className="row">
                    <div className="col">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
            						<th>Date Created</th>
            						<th>Role</th>
                                    <th>Status</th>
            						<th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td className="align-middle">1</td>
                                    <td className="align-middle d-flex align-items-center">
                                        <i className="fas fa-user-circle fa-3x pr-2"></i> Richard Hpa
                                    </td>
                                    <td className="align-middle">04/10/2013</td>
                                    <td className="align-middle">Super Admin</td>
            						<td className="align-middle"><span className="status text-success">•</span> Active</td>
            						<td className="align-middle">
            							<a href="#"><i className="fas fa-cog fa-lg pr-2"></i></a>
            							<a href="#"><i className="fas fa-times-circle text-danger fa-lg"></i></a>
            						</td>
                                </tr>
                                <tr>
                                <td className="align-middle">1</td>
                                    <td className="align-middle d-flex align-items-center">
                                        <i className="fas fa-user-circle fa-3x pr-2"></i> Casey James
                                    </td>
                                    <td className="align-middle">04/10/2013</td>
                                    <td className="align-middle">Admin</td>
                                    <td className="align-middle"><span className="status text-success">•</span> Active</td>
                                    <td className="align-middle">
                                        <a href="#"><i className="fas fa-cog fa-lg pr-2"></i></a>
                                        <a href="#"><i className="fas fa-times-circle text-danger fa-lg"></i></a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Button btnText="Add New User"/>
                    </div>
                </div>
            </section>
        )
    }
}

export default Users
