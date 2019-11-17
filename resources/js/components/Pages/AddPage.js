import React, { Component } from 'react';
import Button from '../Buttons/Button';
import BlockEditor from '../Blocks/Blocks';

class AddPage extends Component {
    constructor (props) {
        super(props)
        this.state = {
            title: '',
            blocks: []
        }
    }

    handleAddBlock = (newBlocks) => {
        const { blocks } = this.state;
        this.setState({
            blocks: newBlocks
        })
    }

    handleRecieveBlocks = (allBlocks) => {
        this.setState({
            blocks: allBlocks
        })
    }

    changeTitle = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    sendForm = (e) => {
        e.preventDefault();
        const { title, blocks } = this.state;
        let form = new FormData();
        form.append('page_title', title);
        form.append('blocks', JSON.stringify(blocks));
        axios.post('/api/pages/add', form)
        .then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log('error');
        });
    }

    render () {
        const { blocks } = this.state;
        return (
            <section>
                <div className="row">
                    <div className="col-12 col-md-7">
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                                    <input className="form-control form-control-lg" type="text" placeholder="Page Title" onChange={this.changeTitle}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 d-flex justify-content-center">
                                <BlockEditor
                                    addBlock={this.handleAddBlock}
                                    blocks={blocks}
                                    recieveBlocks={this.handleRecieveBlocks}
                                />
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
