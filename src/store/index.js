import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth:"guest",
    UID:"",
    schedules:{},
    exchange_schedules:{}
  },
  mutations: {},
  actions: {},
  modules: {},
});
