import React, { Component } from 'react';
import './Delete.scss';
import axios from 'axios';

import { Form, Input } from '../Form/Form';

class Delete extends Component {
    constructor (props) {
        super(props)
        this.state = {

        }
    }

    handleSendForm = () => {
        axios.delete(`/${this.props.route}/delete/${this.props.id}`)
            .then((response) => {
                if(response.data == 'success'){
                    this.props.formSuccess();
                }
            }).catch((error) => {
                console.log('error');
            });
    }

    handleCancelForm = () => {
        this.props.formSuccess();
    }

    render () {
        return (
            <div className="modalForm">
                <div className="content">
                <Form
                    method="post"
                    sendForm={this.handleSendForm}
                    heading={`Are you sure you want to delete ${this.props.title}`}
                    btnText='Confirm'
                    cancelForm={this.handleCancelForm}
                />
                </div>
            </div>
        )
    }
}

export default Delete;
