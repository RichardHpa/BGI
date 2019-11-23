import React, { Component } from 'react';
import Gallery from './Gallery';

class Media extends Component {
    constructor (props) {
        super(props)
        this.state = {

        }
    }

    handleSelectedImage = (e) => {
        console.log('view or remove images');
    }

    render () {
        return (
            <div className="row">
                <div className="col">
                    <Gallery selectedImage={this.handleSelectedImage}/>
                </div>
            </div>
        )
    }
}

export default Media
