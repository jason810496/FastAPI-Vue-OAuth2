import request from '../http.js'

const user = {
    register: (data) => {
        return request('post', '/user', data)
    },
    getList() {
        return request('get', '/user')
    },
    getByName(name) {
        return request('get', `/user/${name}`)
    },
    getMyself() {
        return request('get', '/myself')
    },
    updatePass(data) {
        return request('put', '/user/password', data)
    },
    updateBirth(data) {
        return request('put', '/user/birthday', data)
    }
};

export default user;