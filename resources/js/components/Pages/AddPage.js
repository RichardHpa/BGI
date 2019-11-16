import React, { Component } from 'react';
import Button from '../Buttons/Button';
import BlockEditor from '../Blocks/Blocks';

class AddPage extends Component {
    constructor (props) {
        super(props)
        this.state = {
            title: ''
        }
    }

    handleAddBlock = (type) => {
        const { blocks } = this.state;
    }

    changeTitle = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    sendForm = (e) => {
        e.preventDefault();
        const { title } = this.state;
        let form = new FormData();
        form.append('page_title', title);
        axios.post('/api/pages/add', form)
        .then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log('error');
        });
    }

    render () {
        return (
            <section>
                <div className="row">
                    <div className="col-12 col-md-9">
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                                    <input className="form-control form-control-lg" type="text" placeholder="Page Title" onChange={this.changeTitle}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 d-flex justify-content-center">
                                <BlockEditor addBlock={this.handleAddBlock}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md">
                        <div className="card p-4">
                            <button className="btn btn-bgi btn-block" onClick={this.sendForm}>Save Page</button>
                        </div>
                    </div>
                </div>

            </section>
        )
    }
}

export default AddPage
