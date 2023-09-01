import { apiGetUserList } from "../../api/user";

export default {
    namespaced: true,
    state: {
        userList : [],
        me : {
            username : '',
            birth : '',
        }
    },
    getters: {
        userList: (state) => state.userList,
        me: (state) => state.me,
        username: (state) => state.me.username,
        birth: (state) => state.me.birth,
    },
    mutations: {
        SET_USER_LIST(state, userList) {
            state.userList = userList;
        },
        SET_USERNAME(state, username) {
            state.me.username = username;
        },
        SET_BIRTH(state, birth) {
            state.me.birth = birth;
        },
    },
    actions: {
        async getUserList({commit}){
            const { data } = await apiGetUserList();
            commit('SET_USER_LIST', data);
        },
        async setUsername({ commit }, username) {
            commit("SET_USERNAME", username);
        },
        async setBirth({ commit }, birth) {
            commit("SET_BIRTH", birth);
        },
    },
};