import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Media from './Media/Media';
import Users from './Users/Users';
import Pages from './Pages/Pages';
import AddPage from './Pages/AddPage';
import EditPage from './Pages/EditPage';

const pages = [
    { 'id': 1, 'name': 'Dashboard', 'url': '/admin','icon': 'chart-pie' },
    { 'id': 2, 'name': 'Users', 'url': '/admin/users','icon': 'users' },
    { 'id': 3, 'name': 'Media', 'url': '/admin/media','icon': 'photo-video' },
    { 'id': 4, 'name': 'Pages', 'url': '/admin/pages','icon': 'file' },
    { 'id': 5, 'name': 'Staff', 'url': '/admin/staff','icon': 'people-carry' },
    { 'id': 6, 'name': 'Programmes', 'url': '/admin/programmes','icon': 'chalkboard-teacher' },
    { 'id': 7, 'name': 'Navigation', 'url': '/admin/navigation','icon': 'sitemap' },
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
                            <Route exact path='/admin/media' component={Media} />
                            <Route exact path='/admin/users' component={Users} />
                            <Route exact path='/admin/pages' component={Pages} />
                            <Route exact path='/admin/pages/add_page' component={AddPage} />
                            <Route exact path='/admin/pages/edit_page/:id' component={EditPage} />
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
