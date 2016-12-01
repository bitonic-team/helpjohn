import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {mapDispatchToProps} from '../../utils';

export default class Navbar extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <nav className="nav john-navbar">
                <div className="container">
                    <div className="nav-left">
                        <a className="nav-item is-brand" href="#">
                            <img src="http://img11.hostingpics.net/pics/230362Sanstitre.png" alt="Bulma logo"/>
                        </a>
                    </div>
                    <span className="nav-toggle">
                        <span/>
                        <span/>
                        <span/>
                    </span>
                    <div className="nav-right nav-menu">
                        <a className="nav-item" href="#">Blog</a>
                        <span className="nav-item">
                            <a className="button is-outlined john-navbar-button" href="#">
                                <Link to="login">
                                    <span className="john-navbar-button-text">Je suis responsable</span>
                                </Link>
                            </a>
                        </span>
                    </div>
                </div>
            </nav>
        );
    }
}


