import { createApp } from "vue";
import axios from 'axios';

import App from './App.vue';
import router from './router';
import store from "./store";
import api from './api';

import './style.css';




axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:5001/';  // the FastAPI backend

  

createApp(App)
  .use(router)
  .use(store)
  .provide("$api", api)
  .provide("$router", router)
  .provide("$store", store)
  .mount("#app");