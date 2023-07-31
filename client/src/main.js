import { createApp } from "vue";
import axios from 'axios';

import App from './App.vue';
import router from './router';

import './style.css';

import api from './api'


axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:5001/';  // the FastAPI backend


axios.interceptors.response.use(undefined, function (error) {
    if (error) {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        return router.push('/login')
      }
    }
  });
  

createApp(App)
  .use(router)
  .provide("$api", api)
  .mount("#app");