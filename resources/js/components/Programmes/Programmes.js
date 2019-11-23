import React, { Component } from 'react';
import './Programmes.scss';
import { Link } from 'react-router-dom';

import Button from '../Buttons/Button';
// import AddStaff from './AddStaff';

import axios from 'axios';

class Programmes extends Component {
    constructor (props) {
        super(props)
        this.state = {
            allProgrammes: [],
        }
    }

    componentDidMount () {
        axios.get('/api/programme').then(response => {
            this.setState({
                allProgrammes: response.data
            })
        })
    }
    handleFormSuccess = () => {
        // axios.get('/api/staff').then(response => {
        //     this.setState({
        //         allProgrammes: response.data,
        //         add: false,
        //         deleting: null
        //     })
        // })
    }

    render () {
        const { allProgrammes } = this.state;
        return (
            <section>
                <div className="row">
                    <div className="col">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Programme</th>
                                    <th>Url</th>
            						<th>Bio</th>
            						<th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                allProgrammes.map((programme, i) => (
                                    <tr key={i}>
                                        <td className="align-middle d-flex align-items-center">
                                            {programme['name']}
                                        </td>
                                            <td className="align-middle"><a href={`/programme/${programme['clean_name']}`}>/programme/{programme['clean_name']}</a></td>
                                        <td className="align-middle">{programme['tag_line']}</td>
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
                        <Link className="btn btn-bgi" to='./programmes/add'>Add New Staff Member</Link>
                    </div>
                </div>
            </section>
        )
    }
}

export default Programmes;
