import React, { Component } from 'react';
import './Blocks.scss';

import Button from '../Buttons/Button';
import MediaModel from '../Media/MediaModel';

class BlockEditor extends Component {
    constructor (props) {
        super(props)
        this.state = {
            blocks: [{
                id: 1,
                type: 'imageBlock'
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
                                    case 'textBlock': return <TextBlock/>;
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
            mediaID: []
        }
    }

    render () {
        return (
            <div className="block">
                <div className="">
                    <MediaModel/>
                </div>
            </div>
        )
    }
}

class TextBlock extends Component {
    constructor (props) {
        super(props)
        this.state = {
            text: []
        }
    }

    render () {
        return (
            <div className="block">
                <h2>Text Block</h2>
            </div>
        )
    }
}
