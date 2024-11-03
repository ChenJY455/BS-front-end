import { createStore } from "vuex";

export default createStore({
  state: {
    urlBase: "http://localhost:8080",
    username: "",
  },
  getters: {},
  mutations: {
    setUsername(state, newname) {
      state.username = newname;
    },
  },
  actions: {},
  modules: {},
});
