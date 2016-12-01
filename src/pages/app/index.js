import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {mapDispatchToProps} from '../../utils';

class App extends Component{

    constructor(props){
        super(props);
    }

    render(){
        const {children} = this.props;
        return (
            <div>
                {children}
            </div>
        );
    }
}

export default connect((state) => ({}), mapDispatchToProps)(App);