import { LOGIN, LOADING } from '../constants/types'
// 是否登录 
function verifyLogin (user) {
    return {
        type: LOGIN,
        ...user
    }
}

function loading (show) {
    return {
        type: LOADING,
        show
    }
}

export {
    verifyLogin,
    loading
}