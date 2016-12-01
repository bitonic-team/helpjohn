import constants from '../../constants';
import request from 'superagent';

export function login({email, password}){
    return (dispatch) => {
        dispatch({type: constants.LOADING_LOGIN});
        return request
            .post('http://10.8.110.225:8765/users/auth')
            .set('Authorization', '')
            .send({email, password})
            .end((err, result) => {
                if(err) return dispatch({type: constants.LOGIN_ERROR, message: result.body.err});
                const user = result.body;
                const token = user.token;
                const body = {token, user};
                localStorage.setItem('john', JSON.stringify(body));
                return dispatch({type: constants.LOGGED, payload: body});
            });
    };
}

export function logout(){
    return (dispatch) => {
        localStorage.removeItem('john');
        return dispatch({type: constants.LOGOUT});
    };
}


