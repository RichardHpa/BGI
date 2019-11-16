import React, { Component } from 'react';
import Gallery from './Gallery';

class MediaModel extends Component {
    constructor (props) {
        super(props)
        this.state = {
            modalOpen: false
        }
    }

    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    handleSelectedImage = (image) => {
        this.props.sendImage(image);
    }

    render () {
        const {modalOpen} = this.state;
        console.log(modalOpen);
        if(!modalOpen){
            return(
                <button className="btn btn-block btn-placeholder" onClick={this.toggleModal}>Select an Image</button>
            )
        } else {
            return(
                <div id="uploader">
                    <div className="uploaderCard">
                        <Gallery selectedImage={this.handleSelectedImage}/>
                    </div>
                </div>
            )
        }
    }
}

export default MediaModel
