import React, { Component } from 'react';
import './Blocks.scss';

import MediaModel from '../Media/MediaModel';

class ImageBlock extends Component {
    constructor (props) {
        super(props)
        this.state = {
            media: null
        }
    }

    componentDidMount(){
        // console.log(this.props);
        // console.log('mounted');
        if(this.props.blockContent){
            axios.get(`/api/media/${this.props.blockContent}`).then(response => {
              this.setState({
                  media: response.data
              })
          })
        }
    }

    handleSendImage = (imageInfo) => {
        this.setState({
            media: imageInfo
        })
        this.props.sendContent(imageInfo.id);
    }

    render () {
        const { media } = this.state;
        return (
            <div className="block">
                {
                    media === null?
                        <MediaModel sendImage={this.handleSendImage}/>
                    :
                    <img className="img-fluid" src={`/images/uploads/originals/${media.media_name}`} />
                }
            </div>
        )
    }
}

export default ImageBlock;
