import React, { Component } from 'react';
import Button from '../Buttons/Button';
import BlockEditor from '../Blocks/Blocks';

class AddPage extends Component {
    constructor (props) {
        super(props)
        this.state = {
        }
    }

    handleAddBlock = (type) => {
        const { blocks } = this.state;
    }

    render () {
        return (
            <section>
                <div className="row">
                    <div className="col-12">
                        <div className="form-group">
                            <input className="form-control form-control-lg" type="text" placeholder="Page Title"/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                        <BlockEditor addBlock={this.handleAddBlock}/>
                    </div>
                </div>
            </section>
        )
    }
}

export default AddPage
