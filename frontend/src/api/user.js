import request from './req';
import axios from 'axios';

export const apiRegister = data => request('POST', '/users', data);
export const apiGetUserList = () => axios.get('/users');
export const apiGetMyself = () => request('GET', 'users/me');
export const apiUpdatePass = data => request('PUT', '/users/password', data);
export const apiUpdateBirth = data => request('PUT', '/users/birthday', data);
