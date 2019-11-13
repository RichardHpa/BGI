import React, {Component, useCallback} from 'react'
import axios from 'axios';

import './Modal.scss';

class MediaModal extends Component {
    constructor (props) {
        super(props);
        this.state = {
            modelOpen: false
        }

    }

    toggleModel = (e) => {
        e.preventDefault();
        this.setState({
            modelOpen: !this.state.modelOpen
        })
    }

    render () {
        const {modelOpen} = this.state;
        let btnStyle = 'btn-bgi';
        if(this.props.btnType === 'dashed'){
            btnStyle = 'placeholderImage';
        }
        if (!modelOpen) {
            return(
                <button className={`btn ${btnStyle}`} onClick={this.toggleModel}>{this.props.btnText? this.props.btnText: 'Upload An Image'}</button>
            )
        } else {
            return(
                <div id="uploader">
                    <div className="uploaderCard">
                        <div className="uploaderContent d-flex flex-column">
                            <div className="uploadHeader">
                            <div className="row border-bottom pb-2">
                                <div className="col-11">
                                    <h3>Choose an Image</h3>
                                    <button className="btn btn-bgi" onClick={this.toggleUploader}>Button</button>
                                </div>
                                <div className="col-1 text-right">
                                    <i className="fas fa-2x fa-times closeBtn" onClick={this.toggleModel}></i>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default MediaModal;
