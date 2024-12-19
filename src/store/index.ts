import { createStore } from "vuex";

export default createStore({
  state: {
    urlBase: "http://localhost:15455",
    username: "",
    uid: 0,
    email: "",
    isLogin: false,
  },
  getters: {},
  mutations: {
    setUsername(state, username) {
      state.username = username;
    },
    setUid(state, uid) {
      state.uid = uid;
    },
    setIsLogin(state, isLogin) {
      state.isLogin = isLogin;
    },
    setEmail(state, email) {
      state.email = email;
    },
  },
  actions: {},
  modules: {},
});
