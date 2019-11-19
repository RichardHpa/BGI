import React, { Component } from 'react';
import './Blocks.scss';

import ImageBlock from './ImageBlock';
import EditorBlock from './EditorBlock';

import axios from 'axios';
import Button from '../Buttons/Button';

class BlockEditor extends Component {
    constructor (props) {
        super(props)
        this.state = {
            currentBlocks: [],
            iterationNum: 0
        }
    }

    componentDidMount () {
        console.log(this.props);
        this.setState({
            currentBlocks: this.props.blocks,
            iterationNum: this.props.blocks.length + 1
        })
    }

    addBlock = (type) => {
        const {currentBlocks, iterationNum} = this.state;
        const newBlock = {
            id: iterationNum,
            block_type: type,
            block_content: null,
            originalID: null
        }

        currentBlocks.push(newBlock);
        this.setState({
            currentBlocks: currentBlocks,
            iterationNum: iterationNum + 1
        })
                this.props.recieveBlocks(currentBlocks);
    }

    handleSendContent = (updatedBlock) => {
        const { currentBlocks } = this.state;
        for (var i = 0; i < currentBlocks.length; i++) {
            if(currentBlocks[i].id === updatedBlock.id){
                currentBlocks[i] = updatedBlock;
                break;
            }
        }
        this.props.recieveBlocks(currentBlocks);
    }

    handleRemove = (idToRemove) => {
        const {currentBlocks} = this.state;
        for (let i = 0; i < currentBlocks.length; i++) {
            if(currentBlocks[i].id === idToRemove){
                currentBlocks.splice(i, 1);
                break;
            }
        }
        this.setState({
          currentBlocks: currentBlocks
        })
        this.props.recieveBlocks(currentBlocks);
    }


    render () {
        const { currentBlocks } = this.state;
        return (
            <div className="blockEditor">
                {
                    currentBlocks.map((singleBlock) => (
                        <SingleBlock
                            key={singleBlock.id}
                            blockInfo={singleBlock}
                            remove={this.handleRemove}
                            sendContent={this.handleSendContent}
                        />
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



class SingleBlock extends Component {
    constructor (props) {
        super(props)
        this.state = {

        }
    }

    removeBlock = () => {
        this.props.remove(this.props.blockInfo.id);
    }

    handleSendContent = (content) => {
        let updatedBlock = this.props.blockInfo;
        updatedBlock.block_content = content;
        this.props.sendContent(updatedBlock);
    }

    render(){
        return(
            <div className="blockList">
                <div className="blockContent">
                    {(() => {
                      switch (this.props.blockInfo.block_type) {
                        case 'imageBlock':   return <ImageBlock blockContent={this.props.blockInfo.block_content} sendContent={this.handleSendContent}/>;
                        case 'textBlock':   return <EditorBlock blockContent={this.props.blockInfo.block_content} sendContent={this.handleSendContent}/>;
                      }
                    })()}
                </div>
                <div className="blockControls">
                    <i className="fas fa-caret-square-up text-secondary fa-lg"></i>
                    <i className="fas fa-caret-square-down text-secondary fa-lg"></i>
                    <i onClick={this.removeBlock} className="fas fa-times-circle text-danger fa-lg"></i>
                </div>
            </div>
        )
    }
}
