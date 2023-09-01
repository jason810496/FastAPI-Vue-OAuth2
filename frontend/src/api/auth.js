import axios from 'axios';
import qs from 'qs';
import store from '../store';


export const apiLogin = form => axios.post('/auth/login', qs.stringify(form) , { headers: { 'content-type': 'application/x-www-form-urlencoded' } }  );
export const apiRefresh = () => axios.post('/auth/refresh', { 'refresh_token' : store.getters['auth/refresh_token' ] } );