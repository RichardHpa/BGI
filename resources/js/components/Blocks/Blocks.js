import React, { Component } from 'react';
import './Blocks.scss';

import Button from '../Buttons/Button';
import MediaModel from '../Media/MediaModel';

import CustomEditor from './EditorBlock';

class BlockEditor extends Component {
    constructor (props) {
        super(props)
        this.state = {
            blocks: [{
                id: 1,
                type: 'textBlock'
            }]
        }
    }

    addBlock = (type) => {
        const { blocks } = this.state;
        blocks.push({
            id: blocks.length + 1,
            type: type
        });
        this.setState({
            blocks
        })
        // this.props.addBlock(type);
    }

    render () {
        const { blocks } = this.state;
        return (
            <div className="blockEditor">
                {
                    blocks.map((singleBlock, i) => (
                        <div className="blockList" key={i}>
                            <div className="blockContent">
                                {(() => {
                                  switch (singleBlock.type) {
                                    case 'imageBlock':   return <ImageBlock/>;
                                    case 'textBlock': return <CustomEditor/>;
                                  }
                                })()}
                            </div>
                            <div className="blockControls">
                                <i className="fas fa-times-circle text-danger fa-lg"></i>
                            </div>
                        </div>
                    ))
                }
                <div className="blockSelector">
                    <div className="blockIcon" onClick={this.addBlock.bind(this, 'imageBlock')}>
                        Image Block
                    </div>
                    <div className="blockIcon" onClick={this.addBlock.bind(this, 'textBlock')}>
                        Text Block
                    </div>
                </div>
            </div>

        )
    }
}


export default BlockEditor

class ImageBlock extends Component {
    constructor (props) {
        super(props)
        this.state = {
            media: null
        }
    }

    handleSendImage = (image) => {
        this.setState({
            media: image
        })
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

//
// import { Editor, EditorState , RichUtils, convertFromRaw, convertToRaw} from 'draft-js';
// import {stateToHTML} from 'draft-js-export-html';
//
// class TextBlock extends Component {
//
//     constructor (props) {
//         super(props)
//         this.state = {
//             text: []
//         }
//     }
//
//     render () {
//         return (
//             <div className="block">
//                 <h2>Text Block</h2>
//             </div>
//         )
//     }
// }
