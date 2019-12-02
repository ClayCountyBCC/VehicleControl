export default function reducer(state, action) {
    switch (action.type) {
        case "get_avl":
            return Object.assign(Object.assign({}, state), { avl_data: action.payload });
        default:
            return state;
    }
}
//# sourceMappingURL=AppReducer.js.map