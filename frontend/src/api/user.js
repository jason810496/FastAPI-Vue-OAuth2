import request from './req';
import axios from 'axios';

export const apiRegister = data => axios.post('/users', data);
export const apiGetUserList = () => axios.get('/users');