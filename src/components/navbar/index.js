import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {mapDispatchToProps} from '../../utils';

class Navbar extends Component{

    static contextTypes = {
        router: PropTypes.object
    };

    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(){
        const {actions, user} = this.props;
        if(user.logged) {
            return actions.auth.logout();
        }
        return this.context.router.push('login');
    }

    render(){
        const {user} = this.props;

        return (
            <nav className="nav john-navbar">
                <div className="container">
                    <div className="nav-left">
                        <a className="nav-item is-brand" href="#">
                            <img src="https://helpjohn.xyz/images/logo.png" alt="Bulma logo"/>
                        </a>
                        {user.profile && <a className="nav-item">{user.profile.email}</a>}
                    </div>
                    <span className="nav-toggle">
                        <span/>
                        <span/>
                        <span/>
                    </span>
                    <div className="nav-right nav-menu">
                        <a className="nav-item">Download Electon App</a>
                        <span className="nav-item">
                            <a className="button is-outlined john-navbar-button"
                               onClick={this.onClick}>
                                <span className="john-navbar-button-text">
                                    {user.logged ? 'Log out' : 'I\'m a manager'}
                                </span>
                            </a>
                        </span>
                    </div>
                </div>
            </nav>
        );
    }
}


export default connect((state) => ({
    user: state.user
}), mapDispatchToProps)(Navbar);

