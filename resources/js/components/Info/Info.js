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
            this.setState({
                serverPercentage: Math.ceil(100 - ((response.data.freeSpace / response.data.totalSpace) * 100))
            })
        })
    }

    render () {
        return (
            <section>
                <div className="row">
                    <div className="col-12">
                        <p>Server Space</p>
                        <div className="progress" style={{height: '20px'}}>
                            <div className="progress-bar bg-danger" role="progressbar" style={{width: this.state.serverPercentage+'%'}} aria-valuenow={this.state.serverPercentage} aria-valuemin="0" aria-valuemax="100">{this.state.serverPercentage}%</div>
                        </div>
                    </div>
                </div>

            </section>
        )
    }
}

export default Info
