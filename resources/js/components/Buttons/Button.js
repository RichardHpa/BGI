import React, { Component } from 'react';
import './Button.scss';

class Button extends Component {
    constructor (props) {
        super(props)
        this.state = {

        }
    }

    clickButton = (e) => {
        if(this.props.btnClicked){
            this.props.btnClicked();
        }
    }

    render () {
        return (
            <button className={`btn btn-bgi`} onClick={this.clickButton}>{this.props.btnText}</button>
        )
    }
}

export default Button
