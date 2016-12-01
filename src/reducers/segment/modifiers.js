export function requestSegments(state){
    return {...state, isFetching: true};
}

export function requestError(state, action){
    return {...state, isFetching: false, isError: true, error: action.error};
}

export function onSegments(state, action){
    return {...state, all: action.segments, isFetching: false, isError: false, error: null};
}

export function onTasks(state, action){
    return {...state, tasks: action.tasks};
}

export function onDeleteCurrent(state){
    return {...state, current: null};
}
