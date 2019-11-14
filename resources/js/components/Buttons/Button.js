import React, { Component } from 'react';
import './Button.scss';

class Button extends Component {
    constructor (props) {
        super(props)
        this.state = {

        }
    }

    clickButton = () => {
        // console.log('button has been clicked');
        if(this.props.btnClicked){
            this.props.btnClicked();
        }
    }

    render () {
        return (
            <button className={`btn btn-bgi ${this.props.btnClass}`}>{this.props.btnText}</button>
        )
    }
}

export default Button
