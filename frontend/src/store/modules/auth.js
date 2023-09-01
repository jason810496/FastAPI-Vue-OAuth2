export default {
    namespaced: true,
    state: {
        access_token:null, // jwt token
        refresh_token: null, // jwt token
        expires_in: null, // expires_in
        token_type: null, // bearer
    },
    getters: {
        isAuthenticated: (state) => !!state.access_token && state.expires_in < Date.now(),
        access_token: (state) => state.access_token,
        refresh_token: (state) => state.refresh_token,
    },
    mutations: {
        SET_ACCESS_TOKEN(state, token) {
            state.access_token = token;
        },
        SET_REFRESH_TOKEN(state, token) {
            state.refresh_token = token;
        },
        SET_STATE(state, { access_token, refresh_token, expires_in  , token_type}) {
            state.access_token = access_token;
            state.refresh_token = refresh_token;
            state.expires_in = expires_in;
            state.token_type = token_type;
        },
        RESET_STATE(state) {
            state.access_token = null;
            state.refresh_token = null;
            state.last_login = null;
            state.token_type = null;
        }
    },
    actions: {
        setState({ commit }, { access_token, refresh_token, expires_in , token_type }) {
            commit("SET_STATE", { access_token, refresh_token, expires_in  , token_type});
        },
        resetState({ commit }) {
            commit("RESET_STATE");
        },
        setAccessToken({ commit }, token) {
            commit("SET_ACCESS_TOKEN", token);
        },
        setRefreshToken({ commit }, token) {
            commit("SET_REFRESH_TOKEN", token);
        },
        resetAccessToken({ commit }) {
            commit("SET_ACCESS_TOKEN", null);
        },
        resetRefreshToken({ commit }) {
            commit("SET_REFRESH_TOKEN", null);
        },
    }

}