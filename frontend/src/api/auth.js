import axios from 'axios';
import qs from 'qs';


export const apiLogin = form => axios.post('/auth/login', qs.stringify(form) , { headers: { 'content-type': 'application/x-www-form-urlencoded' } }  );
export const apiRefresh = () => axios.post('/auth/refresh');
export const apiLogout = () => axios.post('/auth/logout');
