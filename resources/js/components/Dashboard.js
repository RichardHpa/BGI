import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';

const pages = [
    { 'id': 1, 'name': 'Dashboard', 'url': '/admin','icon': 'chart-pie' },
    { 'id': 2, 'name': 'Users', 'url': '/admin/users','icon': 'users' },
    { 'id': 3, 'name': 'Media', 'url': '/admin/media','icon': 'photo-video' },
];

class Dashboard extends Component {
    constructor(props){
        super(props);

        this.state = {
            currentPage: pages[0]
        }

        this.handleChangePage = this.handleChangePage.bind(this);
    }

    handleChangePage = (pageNum) => {
        this.setState({
            currentPage: pages[pageNum - 1]
        })
    }

    render(){
        return(
            <BrowserRouter>
                <Header/>
                <div className="container-fluid h-100">
                    <div className="row h-100">
                        <Sidebar
                            pages={pages}
                            changePage={this.handleChangePage}
                        />
                        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4 h-100">
                        <div className="row">
                            <div className="col-12">
                                <h1>{this.state.currentPage['name']}</h1>
                            </div>
                        </div>
                        <Switch>

                        </Switch>
                        </main>
                    </div>

                </div>
            </BrowserRouter>
        )
    }
}

export default Dashboard;

if (document.getElementById('reactApp')) {
    ReactDOM.render(<Dashboard />, document.getElementById('reactApp'));
}
