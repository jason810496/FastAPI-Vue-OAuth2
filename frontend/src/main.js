import { createApp } from "vue";
import axios from 'axios';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import './style.css';


axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL || 'http://localhost:5001/api';  // the FastAPI backend

const pinia = createPinia()

createApp(App)
  .use(pinia)
  .use(router)
  .mount("#app");