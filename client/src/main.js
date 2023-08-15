import { createApp } from "vue";
import axios from 'axios';

import App from './App.vue';
import router from './router';
import store from "./store";

import './style.css';

import api from './api'


axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:5001/';  // the FastAPI backend

  

createApp(App)
  .use(router)
  .use(store)
  .provide("$api", api)
  .mount("#app");