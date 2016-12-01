import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {mapDispatchToProps} from '../../utils';
import {NavBar, Map, List} from '../../components';


const zone = [
    {
        lat: '',
        lng: '',
        nbRefugees: 300,

    }
];


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
                <div className="columns is-gapless">
                    <div className="column">
                        <List/>
                    </div>
                    <div className="column is-7"
                         style={{height: '100vh'}}>
                        <Map/>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state) => ({
    user: state.user
}), mapDispatchToProps)(Home);