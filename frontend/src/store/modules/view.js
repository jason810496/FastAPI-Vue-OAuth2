export default {
    namespaced: true,
    state: {
        loading: false,
    },
    getters: {
        loading: (state) => state.loading,
    },
    mutations: {
        SET_LOADING(state, loading) {
            state.loading = loading;
        }
    },
    actions: {
        setLoading({ commit }) {
            console.log("setLoading");
            commit("SET_LOADING", true);
        },
        resetLoading({ commit }) {
            console.log("resetLoading");
            commit("SET_LOADING", false);
        }
    }

}