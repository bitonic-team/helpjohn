export function onLogged(state, action){
    const body = action.payload;
    return {...state, logged: true, loginLoading: false, loginError: '', profile: body.user, token: body.token};
}

export function onLoadingLogin(state){
    return {...state, loginLoading: true, loginError: ''};
}

export function onLoginError(state, action){
    return {...state, loginLoading: false, loginError: action.message};
}

export function onLogout(state){
    return {...state, logged: false, profile: null, token: null};
}