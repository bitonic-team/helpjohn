import constants from '../../constants';
import * as modifiers from './modifiers';
import exporter from '../exporter';

const storage = JSON.parse(localStorage.getItem('john'));

const initial = {
    loginLoading: false,
    loginError: '',
    logged: !!storage,
    token: storage && storage.token,
    profile: storage && storage.user
};

const handlers = {
    [constants.LOADING_LOGIN]: modifiers.onLoadingLogin,
    [constants.LOGGED]: modifiers.onLogged,
    [constants.LOGIN_ERROR]: modifiers.onLoginError,
    [constants.LOGOUT]: modifiers.onLogout
};

export default exporter(initial, handlers);
