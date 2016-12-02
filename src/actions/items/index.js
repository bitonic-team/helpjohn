import constants from '../../constants';
import request from 'superagent';

export function add(body){
    const storage = JSON.parse(localStorage.getItem('john'));
    return (dispatch) => {
        return request
            .post('https://api.helpjohn.xyz/items')
            .set('Authorization', storage.token)
            .send(body)
            .end((err, result) => {
                if(err) console.log('err', err);
                const list = result.body;
                return dispatch({type: constants.ITEMS_FETCHED, list});
            });
    };
}


export function list(zone){
    const storage = JSON.parse(localStorage.getItem('john'));

    return (dispatch) => {
        return request
            .get('https://api.helpjohn.xyz/items')
            .end((err, result) => {
                if(err) console.log('err', err);

                const list = storage && storage.user
                    ? result.body.filter((x) => x.zone === storage.user.zone)
                    : result.body.filter((x) => x.zone === zone);

                return dispatch({type: constants.ITEMS_FETCHED, list});
            });
    };
}

export function update(arr){
    const storage = JSON.parse(localStorage.getItem('john'));
    return (dispatch) => {
        return request
            .put('https://api.helpjohn.xyz/items')
            .query({zone: storage.user && storage.user.zone})
            .set('Authorization', storage.token)
            .send(arr)
            .end((err, result) => {
                if(err) console.log('err', err);
                const list = result.body;
                return dispatch({type: constants.ITEMS_FETCHED, list});
            });
    };
}

export function del(id){
    const storage = JSON.parse(localStorage.getItem('john'));

    return (dispatch) => {
        return request
            .del('https://api.helpjohn.xyz/items/' + id)
            .query({zone: storage.user && storage.user.zone})
            .set('Authorization', storage.token)
            .end((err, result) => {
                if(err) console.log('err', err);
                const list = result.body;
                return dispatch({type: constants.ITEMS_FETCHED, list});
            });
    };
}

export function getZones(body){
    return (dispatch) => {
        return request
            .get('https://api.helpjohn.xyz/zones')
            .send(body)
            .end((err, result) => {
                if(err) console.log('err', err);
                const zones = result.body;
                return dispatch({type: constants.ZONES_FETCHED, zones});
            });
    };
}

export function donate(body){
    return (dispatch) => {
        return request
            .post('https://api.helpjohn.xyz/donations')
            .send(body)
            .end((err, result) => {
                const list = result.body;
                return dispatch({type: constants.ITEMS_FETCHED, list});
            });
    };
}