import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {mapDispatchToProps} from '../../utils';
import {Link} from 'react-router';
import {NavBar} from '../../components';

class Login extends Component{

    static contextTypes = {
        router: PropTypes.object
    };

    constructor(props){
        super(props);
        this.login = this.login.bind(this);
        this.change = this.change.bind(this);
        this.state = {
            email: '',
            password: ''
        }
    }

    componentWillMount(){
        if(this.props.user.logged) return this.context.router.push('home');
    }

    componentWillReceiveProps(props){
        if(props.user.logged) return this.context.router.push('home');
    }

    login(){
        const {actions} = this.props;
        const {email, password} = this.state;
        return actions.auth.login({email, password});
    }

    change(type){
        return (value) => this.setState({[type]: value});
    }

    render(){
        const {user} = this.props;
        const {loginLoading, loginError} = user;

        const btnClass = loginLoading
            ? 'button login-button is-primary is-loading'
            : 'button login-button is-primary';

        return (
            <div className="login-page">
                <div className="login-box">

                    <p className="login-title">Connectez vous</p>

                    <p className="control">
                        <input className="input" type="text" placeholder="Email"/>
                    </p>
                    <p className="control">
                        <input className="input" type="password" placeholder="Password"/>
                    </p>
                    <p className="login-error">{loginError || '.'}</p>
                    <p className="control login-buttons">
                        <button onClick={this.login}
                                className={btnClass}>Connexion</button>
                        {!loginLoading &&<button className="button login-button is-link">
                            <Link to="home">Annuler</Link>
                        </button>}
                    </p>
                </div>
            </div>
        );
    }
}

export default connect((state) => ({
    user: state.user
}), mapDispatchToProps)(Login);