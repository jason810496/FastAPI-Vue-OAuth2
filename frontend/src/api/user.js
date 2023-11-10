import request from './req';
import axios from 'axios';

export const apiRegister = data => request('POST', '/users', data);
export const apiGetUserList = () => axios.get('/users');