import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Sidebar.scss';

class Sidebar extends Component {
    constructor(props){
        super(props);

        const startingPath = window.location.pathname;
        const allPages = this.props.pages;
        let currentPage;
        for (let i = 0; i < allPages.length; i++) {
            if(startingPath.search(allPages[i].url) > -1){
                currentPage = allPages[i].id;
            }
        }
        this.state = {
            selectedTab: currentPage
        }
        this.props.changePage(currentPage);
    }

    isActive(id){
        return this.state.selectedTab === id;
    }

    setActiveTab(selectedTabID){
        this.setState({selectedTab:selectedTabID});
        this.props.changePage(selectedTabID);
    }

    render(){
        var allPages = this.props.pages,
        tabs = allPages.map(function(el, i){
            return <Tab
                        key={i}
                        pageTitle={el.name}
                        url={el.url}
                        isActive={this.isActive(el.id)}
                        onActiveTab={this.setActiveTab.bind(this, el.id)}
                        icon={el.icon}
                    />
        }, this);
        return(
            <nav className="col-md-2 bg-dark sidebar">
                <div id="navbarSidebar" className="sidebar-sticky collapse show">
                    <ul className="nav flex-column">
                        {tabs}
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Sidebar;

class Tab extends Component{
    constructor(props){
        super(props)
    }
    render(){
        var classes = 'fas fa-fw fa-' + this.props.icon;
        return(
            <li className={this.props.isActive ? 'nav-item active': 'nav-item'} onClick={this.props.onActiveTab}>
                <Link className="nav-link" to={this.props.url}>
                    <i className={classes}></i> {this.props.pageTitle} <span className="sr-only">(current)</span>
                </Link>
            </li>
        )
    }
}
