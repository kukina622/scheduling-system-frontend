import Vue from "vue";
import Vuex from "vuex";
import { apiGetUserInfo } from "@/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sid: "",
    username: "",
    shiftTime: [],
    isAdmin: false,
    isLogin: false,
  },
  mutations: {
    updateUserInfo(state, userInfo) {
      state.sid = userInfo.sid;
      state.username = userInfo.username;
      state.shiftTime = userInfo.shiftTime;
      state.isAdmin = userInfo.isAdmin;
      state.isLogin = true;
    },
  },
  actions: {
    getUserInfo({ commit }) {
      const token = localStorage.getItem("token");
      const sid = localStorage.getItem("sid");
      const isAdmin = JSON.parse(atob(token.split(".")[1])).isAdmin;
      apiGetUserInfo({ sid: sid, token: token })
        .then((res) => {
          let resData = res.data;
          commit("updateUserInfo", {
            sid: sid,
            username: resData.username,
            shiftTime: resData.shiftTime,
            isAdmin: isAdmin,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  modules: {},
});
