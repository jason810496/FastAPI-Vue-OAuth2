import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import auth from './modules/auth';
import user from './modules/user';

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {},
  getters: {
  },
  modules: {
    auth,
    user,
  },
  plugins: [
    createPersistedState({
      storage: window.localStorage
    }),
  ],
});