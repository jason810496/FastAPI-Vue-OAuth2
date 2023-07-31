import request from '../http.js'

const user = {
    getList() {
        return request('get', '/user')
    },
    getByName(name) {
        return request('get', `/user/${name}`)
    },
    updatePass(data) {
        return request('put', '/user/password', data)
    },
    updateBirth(data) {
        return request('put', '/user/birthday', data)
    }
};

export default user;