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
        axios.get('/api/pages').then(response => {
            this.setState({
                pages: response.data
            })
        })
    }

    render () {
        const { pages } = this.state;
        return (
            <section>
                <div className="row">
                    <div className="col">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Url</th>
            						<th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                pages.map((page, i) => (
                                    <tr key={i}>
                                        <td className="align-middle d-flex align-items-center">
                                            {page['page_title']}
                                        </td>
                                        <td className="align-middle"><a href={`/${page['page_url']}`}>/{page['page_url']}</a></td>
                                        <td className="align-middle">
                                            <Link to={`./pages/edit_page/${page['id']}`}><i className="fas fa-cog fa-lg pr-2"></i></Link>
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
                        <Link className="btn btn-bgi" to='./pages/add_page'>Add New Page</Link>
                    </div>
                </div>
            </section>
        )
    }
}

export default Pages
