import React, { Component } from 'react';
import './Blocks.scss';

import axios from 'axios';
import Button from '../Buttons/Button';
import MediaModel from '../Media/MediaModel';

import CustomEditor from './EditorBlock';

class BlockEditor extends Component {
    constructor (props) {
        super(props)
        this.state = {
            blocks: []
        }
    }

    componentDidMount () {
        this.setState({
            blocks: this.props.blocks
        })
    }

    addBlock = (type) => {
        const { blocks } = this.state;
        blocks.push({
            id: blocks.length + 1,
            section_type: type,
            section_content: ''
        });
        this.setState({
            blocks
        })
        this.props.addBlock(blocks);
    }

    handleSendContent = (updatedBlock) => {
        const { blocks } = this.state;
        for (var i = 0; i < blocks.length; i++) {
            if(blocks[i].id === updatedBlock.id){
                blocks[i].section_content = updatedBlock.section_content
                this.setState({
                    blocks
                })
                this.props.recieveBlocks(blocks);
                break;
            }
        }

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
                                  switch (singleBlock.section_type) {
                                    case 'imageBlock':   return <ImageBlock blockInfo={singleBlock} sendContent={this.handleSendContent}/>;
                                    case 'textBlock': return <CustomEditor blockInfo={singleBlock} sendContent={this.handleSendContent}/>;
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
            media: null,
            editorID: null
        }
    }

    componentDidMount () {
        const { editorState } = this.state;
        if(this.props.blockInfo.section_content){
            axios.get(`/api/media/${this.props.blockInfo.section_content}`).then(response => {
                this.setState({
                    media: response.data,
                    editorID: this.props.blockInfo.id
                })
            })
        } else {
            this.setState({
                editorID: this.props.blockInfo.id
            })
        }
    }

    handleSendImage = (image) => {
        this.setState({
            media: image
        })
        const newValues = {
            id: this.state.editorID,
            section_content: image.id
        }
        this.props.sendContent(newValues);
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
