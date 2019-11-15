import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Pages.scss';

import Button from '../Buttons/Button';

import axios from 'axios';

class Pages extends Component {
    constructor (props) {
        super(props)
        this.state = {
            pages: []
        }
    }

    componentDidMount () {

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
                                    <th>Title</th>
            						<th>Author</th>
            						<th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Link className="btn btn-bgi" to='./add-page'>Add New Page</Link>
                    </div>
                </div>
            </section>
        )
    }
}

export default Pages
