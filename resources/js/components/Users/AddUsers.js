import React, { Component } from 'react';
import './Users.scss';
import axios from 'axios';
import FormData from 'form-data';

import {Form, Input} from '../Form/Form';

class AddUsers extends Component {
    constructor (props) {
        super(props)
        this.state = {

        }
    }

    handleSendForm = (values) => {
        console.log(values);
        let form = new FormData();
        for (let i = 0; i < values.length; i++) {
            form.append(values[i].name, values[i].value);
        }
        axios.post('/api/users/add', form)
        .then((response) => {
            if(response){
                this.props.formSuccess();
            }
        }).catch((error) => {
            console.log('error');
        });
    }

    render () {
        return (
            <div className="modalForm">
                <div className="content">
                    <Form
                        method="post"
                        sendForm={this.handleSendForm}
                        heading="Add a New User"
                    >
                        <Input
                            label="Name"
                            name="name"
                            validation="required"
                        />
                        <Input
                            label="Email"
                            type="email"
                            name="email"
                            validation="required"
                        />
                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            validation="required,min:4"
                        />
                        <Input
                            label="Confirm Password"
                            type="password"
                            name="password_confirmation"
                            validation="required,match:password"
                        />
                    </Form>
                </div>
            </div>
        )
    }
}

export default AddUsers
