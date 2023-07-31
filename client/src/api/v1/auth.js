import request from '../http.js'

const auth = {
    register: (data) => {
        return request('post', '/register', data)
    },
    login: (data) => {
        return request('post', '/login', data)
    },
    refresh: (data) => {
        return request('post', '/refresh', data)
    },
};

export default auth;