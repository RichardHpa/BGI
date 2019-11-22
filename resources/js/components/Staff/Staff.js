import React, { Component } from 'react';
import './Staff.scss';

import Button from '../Buttons/Button';
import Delete from '../Delete/Delete';
import AddStaff from './AddStaff';

import axios from 'axios';

class Staff extends Component {
    constructor (props) {
        super(props)
        this.state = {
            allStaff: [],
            add: false,
            deleting: false
        }
    }

    componentDidMount () {
        axios.get('/api/staff').then(response => {
            this.setState({
                allStaff: response.data
            })
        })
    }

    openModal = () => {
        this.setState({
            add: !this.state.add
        })
    }

    toggleDelete = (user) => {
        this.setState({
            deleting: user
        })
    }

    handleFormSuccess = () => {
        axios.get('/api/staff').then(response => {
            this.setState({
                allStaff: response.data,
                add: false,
                deleting: null
            })
        })
    }

    render () {
        const { add, allStaff, deleting } = this.state;
        return (
            <section>
                <div className="row">
                    <div className="col">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Name</th>
            						<th>Role</th>
            						<th>Email</th>
            						<th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                allStaff.map((staff, i) => (
                                    <tr key={i}>
                                        <td className="align-middle d-flex align-items-center">
                                            {
                                                staff['image']?
                                                <img src={`../images/uploads/thumbnails/${staff['image']}`} className="img-fluid smallImg"/>
                                                :
                                                <i className="fas fa-user-circle fa-3x pr-2"></i>
                                            }
                                            {staff['name']}
                                        </td>
                                        <td className="align-middle">{staff['role']}</td>
                                        <td className="align-middle">{staff['email']}</td>
                                        <td className="align-middle">
                                            <a href="#"><i className="fas fa-cog fa-lg pr-2"></i></a>
                                            <a href="#" onClick={this.toggleDelete.bind(this, staff)}><i className="fas fa-times-circle text-danger fa-lg"></i></a>
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
                        <Button btnText="Add New Staff Member" btnClicked={this.openModal}/>
                    </div>
                </div>
                {add && <AddStaff formSuccess={this.handleFormSuccess}/>}
                {deleting && <Delete id={deleting['id']} title={deleting['name']} route="staff" formSuccess={this.handleFormSuccess}/>}
            </section>
        )
    }
}

export default Staff
