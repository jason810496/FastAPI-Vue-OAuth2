import request from '../http.js'
import axios from 'axios';
import qs from 'qs';
import store from '../../store';

const auth = {
    login: async (form) => {
        return axios.post('/api/auth/login', qs.stringify(form) , { headers: { 'content-type': 'application/x-www-form-urlencoded' } }  )
    },
    refresh: (data) => {
        return request('post', '/auth/refresh', data = { 'refresh_token' : store.getters['auth/refresh_token' ] } )
    },
};

export default auth;