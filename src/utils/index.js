import {bindActionCreators} from 'redux';
import actions from '../actions';

export function mapDispatchToProps(){
    return (dispatch) => ({actions: getBound(actions, dispatch)});
}

function getBound(actions, dispatch){
    return Object.keys(actions).reduce((acc, curr) => {
        acc[curr] = bindActionCreators(actions[curr], dispatch);
        return acc;
    }, {});
}