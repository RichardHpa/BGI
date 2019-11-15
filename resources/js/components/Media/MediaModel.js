import React, { Component } from 'react';
import Gallery from './Gallery';

class MediaModel extends Component {
    constructor (props) {
        super(props)
        this.state = {
            modelOpen: false
        }
    }

    render () {
        const {modelOpen} = this.state;
        if(!modelOpen){
            return(
                <button className="btn btn-block btn-placeholder">Select an Image</button>
            )

        } else {
            return(
                <div>

                </div>
            )
        }
    }
}

export default MediaModel
