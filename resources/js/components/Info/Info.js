import React, { Component } from 'react';
import './Info.scss';

import axios from 'axios';

class Info extends Component {
    constructor (props) {
        super(props)
        this.state = {
            serverPercentage: 0
        }
    }

    componentDidMount () {
        axios.get('/api/info').then(response => {
            console.log(response.data);
            this.setState({
                serverPercentage: 100 - ((response.data.freeSpace / response.data.totalSpace) * 100)
            })
        })
    }

    render () {
        console.log(this.state.serverPercentage);
        return (
            <section>
                <div className="progress" style={{height: '20px'}}>
                    <div className="progress-bar" role="progressbar" style={{width: '25%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
                </div>
            </section>
        )
    }
}

export default Info
