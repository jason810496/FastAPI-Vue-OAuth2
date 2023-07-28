export default {
    namespaced: true,
    state: {
        access_token: "", // jwt token
        refresh_token: "", // jwt token
        last_login: null, // last login time
    },
    getters: {
        access_token: (state) => state.access_token,
        refresh_token: (state) => state.refresh_token,
        last_login: (state) => state.last_login,
    },
    mutations: {
        SET_ACCESS_TOKEN(state, token) {
            state.access_token = token;
        },
        SET_REFRESH_TOKEN(state, token) {
            state.refresh_token = token;
        },
        SET_LAST_LOGIN(state, time) {
            state.last_login = time;
        }
    },
    actions: {
        setAccessToken({ commit }, token) {
            commit("SET_ACCESS_TOKEN", token);
        },
        setRefreshToken({ commit }, token) {
            commit("SET_REFRESH_TOKEN", token);
        },
        deleteAccessToken({ commit }) {
            commit("SET_ACCESS_TOKEN", "");
        },
        deleteRefreshToken({ commit }) {
            commit("SET_REFRESH_TOKEN", "");
        },
        setLastLogin({ commit }, time) {
            commit("SET_LAST_LOGIN", time);
        }
    }

}