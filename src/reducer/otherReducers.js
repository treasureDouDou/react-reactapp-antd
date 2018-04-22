// 需要增加进来的reducers
function demo(state = {
    demo: ''
}, action) {
    switch (action.type) {
        case 'demo':
            return Object.assign({}, state, {
                demo: action.demo
            })
        default:
            return state
    }
}
export default {
    demo
}