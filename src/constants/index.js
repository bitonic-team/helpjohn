const authConstants = {
    LOGGED: 'LOGGED',
    LOGOUT: 'LOGOUT',
    LOGIN_ERROR: 'LOGGIN_ERROR',
    LOADING_LOGIN: 'LOADING_LOGIN'
};

const itemsConstants = {
    ITEMS_FETCHED: 'ITEMS_FETCHED',
    ZONES_FETCHED: 'ZONES_FETCHED'
};
export default Object.assign({},
    authConstants,
    itemsConstants
);