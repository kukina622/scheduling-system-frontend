import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth: "guest", //guest user admin
    sid: "",
    username: "",
  },
  mutations: {},
  actions: {},
  modules: {},
});
