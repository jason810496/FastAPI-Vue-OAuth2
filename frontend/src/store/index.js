import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import auth from './modules/auth';
import user from './modules/user';
import view from './modules/view';

const store = createStore({
  modules: {
    auth,
    user,
    view,
  },
  plugins: [
    createPersistedState({
      storage: window.localStorage
    }),
  ],
});

export default store;