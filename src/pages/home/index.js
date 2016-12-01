import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {mapDispatchToProps} from '../../utils';
import {NavBar} from '../../components';

class Home extends Component{

    static contextTypes = {
        router: PropTypes.object
    };

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <NavBar/>
            </div>
        );
    }
}

export default connect((state) => ({
    user: state.user
}), mapDispatchToProps)(Home);