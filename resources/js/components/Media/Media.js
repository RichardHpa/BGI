import React, { Component } from 'react';
import Gallery from './Gallery';


class Media extends Component {
    constructor (props) {
        super(props)
        this.state = {

        }
    }


    render () {
        return (
            <div className="row">
                <div className="col">
                    <Gallery/>
                </div>
            </div>
        )
    }
}

export default Media
