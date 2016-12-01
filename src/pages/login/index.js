import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {mapDispatchToProps} from '../../utils';
import {NavBar} from '../../components';

class Login extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="login-page">
                <div className="login-box">
                    <p className="control">
                        <input className="input" type="text" placeholder="Email"/>
                    </p>
                    <p className="control">
                        <input className="input" type="text" placeholder="Password"/>
                    </p>
                    <p className="control is-pulled-right">
                        <button className="button is-primary">Connexion</button>
                        <button className="button is-link">Annuler</button>
                    </p>
                </div>
            </div>
        );
    }
}

export default connect((state) => ({}), mapDispatchToProps)(Login);