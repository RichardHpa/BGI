import React, { Component } from 'react';
import { Editor, EditorState , RichUtils, convertFromHTML, ContentState} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import './EditorBlock.scss';



class CustomEditor extends Component {
    constructor () {
        super()
        this.state = {
            editorState: EditorState.createEmpty(),
            editorText: '',
            focused: false,
            editorID: null
        }
        this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
        this.toggleBlockType = this.toggleBlockType.bind(this);
        this.onChange = this.onChange.bind(this);
        this.toggleActive = this.toggleActive.bind(this);
    }

    componentDidMount () {
        const { editorState } = this.state;
        if(this.props.blockInfo !== undefined){

            if(this.props.blockInfo.content){
                const blocksFromHTML = convertFromHTML(this.props.blockInfo.content);
                const content = ContentState.createFromBlockArray(
                  blocksFromHTML.contentBlocks,
                  blocksFromHTML.entityMap
                );
                this.setState({
                    editorState: EditorState.createWithContent(content),
                    editorID: this.props.blockInfo.id
                })
            } else {
                this.setState({
                    editorID: this.props.blockInfo.id
                })
            }
        }
    }

    toggleInlineStyle(inlineStyle){
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
    }

    toggleBlockType(blockType){
        this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
    }

    onChange(editorState){
        const convertedText = stateToHTML(editorState.getCurrentContent());
        this.setState({
            editorState: editorState,
            editorText: convertedText
        });
        const newValues = {
            id: this.state.editorID,
            content: convertedText
        }
        this.props.sendContent(newValues);
    }

    toggleActive(){
        const { focused } = this.state;
        this.setState({
            focused: !focused
        })
    }


    render(){
        const { editorState } = this.state;
        return(
            <div className="editorWrapper block">
                <EditorControls
                active={this.state.focused}
                editorState={editorState}
                onToggle={this.toggleInlineStyle}
                onToggleBlockType={this.toggleBlockType}
                />
                <Editor
                editorState={editorState}
                placeholder="Write about this section"
                spellCheck={true}
                onChange={this.onChange}
                onFocus={this.toggleActive}
                onBlur={this.toggleActive}
                />
            </div>
        )
    }
}

export default CustomEditor;

class EditorButton extends Component {
    constructor() {
        super();

        this.onToggle = this.onToggle.bind(this);
    }

    onToggle(e){
        e.preventDefault();
        this.props.onToggle(this.props.style)
    }

    render() {
        let className = 'editorButton';
        if (this.props.active) {
            className += ' editorButtonActive';
        }
        return (
            <span className={className} onMouseDown={this.onToggle}>
            {this.props.label}
            </span>
        );
    }
}

const INLINE_STYLES = [
    {
        label: 'Bold',
        style: 'BOLD'
    }, {
        label: 'Italic',
        style: 'ITALIC'
    }, {
        label: 'Underline',
        style: 'UNDERLINE'
    }
];


const EditorControls = (props) => {
    var currentStyle = props.editorState.getCurrentInlineStyle();
    const selection = props.editorState.getSelection();
    const blockType = props.editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
    return (
        <div className={`editorControls ${props.active? 'open': ''}`}>
        {INLINE_STYLES.map(
            type => <EditorButton
            key={type.label}
            active={currentStyle.has(type.style)}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
            />
        )}
        <br/>
        {BLOCK_TYPES.map(
            (type) => <EditorButton
            key={type.label}
            active={type.style === blockType}
            label={type.label}
            onToggle={props.onToggleBlockType}
            style={type.style}
            />
        )}
        </div>
    );
};

const BLOCK_TYPES = [
    {
        label: 'H1',
        style: 'header-one'
    }, {
        label: 'H2',
        style: 'header-two'
    }, {
        label: 'H3',
        style: 'header-three'
    }, {
        label: 'H4',
        style: 'header-four'
    }, {
        label: 'H5',
        style: 'header-five'
    }, {
        label: 'H6',
        style: 'header-six'
    }, {
        label: 'UL',
        style: 'unordered-list-item'
    }, {
        label: 'OL',
        style: 'ordered-list-item'
    }
];
