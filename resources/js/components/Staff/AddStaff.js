import React, { Component } from 'react';
import axios from 'axios';
import FormData from 'form-data';

import { Form, Input, Textarea, Image } from '../Form/Form';
import MediaModel from '../Media/MediaModel';

class AddStaff extends Component {
    constructor (props) {
        super(props)
        this.state = {

        }
    }

    handleSendForm = (values) => {
        let form = new FormData();
        for (let i = 0; i < values.length; i++) {
            form.append(values[i].name, values[i].value);
        }
        axios.post('/api/staff/add', form)
        .then((response) => {
            if(response){
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
                        heading="Add a New Staff Member"
                        cancelForm={this.handleCancelForm}
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
                            label="Role"
                            type="text"
                            name="role"
                            validation="required"
                        />
                        <Textarea
                            label="Bio"
                            type="text"
                            name="bio"
                            validation="required"
                        />
                        <Image
                            label="Image"
                            name="image"
                        />
                    </Form>
                </div>
            </div>
        )
    }
}

export default AddStaff;
