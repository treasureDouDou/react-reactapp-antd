import { LOGIN, LOADING } from '../constants/types'
import { combineReducers } from 'redux'
import otherReducers from './otherReducers'
// 登录验证
function verifyUser(state = {
    isLogin: false,
    user: ''
}, action) {
    switch (action.type) {
        case LOGIN:
            return Object.assign({}, state, {
                isLogin: action.isLogin,
                user: action.user
            })
        default:
            return state
    }
}

// 加载中
function loading(state = {
    show: false
}, action) {
    switch (action.type) {
        case LOADING:
            return Object.assign({}, state, {
                show: action.show
            })
        default:
            return state
    }
}

const App =  combineReducers({
    verifyUser,
    loading,
    ...otherReducers // 其他需要增加的reducers
})
export default App

