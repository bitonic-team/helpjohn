export default function exporter(initialState, handlers){
    return (state = initialState, action) => handlers[action.type] ? handlers[action.type](state, action) : state;
}