import Vue from "vue";
import Vuex from "vuex";
import {
  apiGetUserInfo,
  apiGetAllUserShiftTime,
  apiGetAllShiftData,
} from "@/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sid: "",
    username: "",
    shiftTime: [],
    isAdmin: false,
    isLogin: false,
    allUserShiftTime: [], //每個使用者的值班時間
    allShiftData: [], //全部的換班資料
  },
  mutations: {
    updateUserInfo(state, userInfo) {
      state.sid = userInfo.sid;
      state.username = userInfo.username;
      state.shiftTime = userInfo.shiftTime;
      state.isAdmin = userInfo.isAdmin;
      state.isLogin = true;
    },
    updateAllUserShiftTime(state, allUserShiftTime) {
      state.allUserShiftTime = allUserShiftTime;
    },
    updateShiftTime(state, shiftTime) {
      state.shiftTime = shiftTime;
    },
    updateAllShiftData(state, allShiftData) {
      state.allShiftData = allShiftData;
    },
  },
  actions: {
    async getUserInfo({ commit }) {
      const token = localStorage.getItem("token");
      const sid = localStorage.getItem("sid");
      const isAdmin = JSON.parse(atob(token.split(".")[1])).isAdmin;
      try {
        let res = await apiGetUserInfo(sid);
        let resData = res.data;
        commit("updateUserInfo", {
          sid: sid,
          username: resData.username,
          shiftTime: resData.shiftTime,
          isAdmin: isAdmin,
        });
      } catch (err) {
        console.log(err.response.data.message);
      }
    },
    async getAllUserShiftTime({ commit }) {
      try {
        let res = await apiGetAllUserShiftTime();
        const allUserShiftTime = res.data.allUserShiftTime;
        commit("updateAllUserShiftTime", allUserShiftTime);
      } catch (err) {
        console.log(err.response.data.message);
      }
    },
    async getAllShiftData({ commit }) {
      try {
        let res = await apiGetAllShiftData();
        let allShiftData = res.data.allShiftData;
        commit("updateAllShiftData", allShiftData);
      } catch (err) {
        console.log(err.response.data.message);
      }
    },
  },
  modules: {},
});
