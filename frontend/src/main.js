import { createApp } from "vue";
import axios from 'axios';

import App from './App.vue';
import router from './router';
import store from "./store";

import './style.css';




axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:5001/api';  // the FastAPI backend

  

createApp(App)
  .use(router)
  .use(store)
  .provide("$router", router)
  .provide("$store", store)
  .mount("#app");