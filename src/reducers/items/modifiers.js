export function onItems(state, action){
    const list = action.list;
    return {...state, list};
}

export function onZones(state, action){
    const zones = action.zones;
    return {...state, zones};
}

export function onLogout(state){
    return {...state, list: []};
}
