export default {
    namespaced: true,
    state: {
        username: "",
        birth: "",
    },
    getters: {
        username: (state) => state.username,
        birth: (state) => state.birth,
    },
    mutations: {
        SET_USERNAME(state, username) {
            state.username = username;
        },
        SET_BIRTH(state, birth) {
            state.birth = birth;
        },
    },
    actions: {
        setUsername({ commit }, username) {
            commit("SET_USERNAME", username);
        },
        setBirth({ commit }, birth) {
            commit("SET_BIRTH", birth);
        },
    },
};