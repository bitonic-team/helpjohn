import constants from '../../constants';

export function login({email, password}){
    return (dispatch) => {
        dispatch({type: constants.LOADING_LOGIN});



        setTimeout(() => {
            const body = {
                token: '123abc',
                user: {
                    name: 'Dave',
                    surname: 'Cingala',
                    email: 'david.cingala@gmail.com'
                }
            };
            localStorage.setItem('john', JSON.stringify(body));
            return dispatch({type: constants.LOGGED, payload: body});
            //return dispatch({type: constants.LOGIN_ERROR, message: 'Mauvais mot de passe'});
        }, 2000);


    };
}

export function logout(){
    return (dispatch) => {
        localStorage.removeItem('john');
        return dispatch({type: constants.LOGOUT});
    };
}


