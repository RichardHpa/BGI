import React, { Component } from 'react';

import './Header.scss';

class Header extends Component {
    constructor(props){
        super(props);

    }

    render(){
        return(
            <nav className="navbar navbar-dark sticky-top bg-dark navbar-expand-md justify-content-between">
                <a className='navbar-brand' href='/'>Hey, { window.name }</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSidebar" aria-controls="navbarSidebar" aria-expanded="false" aria-label="Toggle SidebarNavigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/logout">Logout</a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Header;
