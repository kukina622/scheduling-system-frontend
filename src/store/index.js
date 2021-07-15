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
    logout(state) {
      localStorage.removeItem("sid");
      localStorage.removeItem("token");
      state.sid = "";
      state.username = "";
      state.shiftTime = [];
      state.isAdmin = false;
      state.isLogin = false;
      state.allUserShiftTime = [];
      state.allShiftData = [];
    },
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
      let res = await apiGetUserInfo(sid);
      let resData = res.data;
      commit("updateUserInfo", {
        sid: sid,
        username: resData.username,
        shiftTime: resData.shiftTime,
        isAdmin: isAdmin,
      });
    },
    async getAllUserShiftTime({ commit }) {
      let res = await apiGetAllUserShiftTime();
      const allUserShiftTime = res.data.allUserShiftTime;
      commit("updateAllUserShiftTime", allUserShiftTime);
    },
    async getAllShiftData({ commit }) {
      let res = await apiGetAllShiftData();
      let allShiftData = res.data.allShiftData;
      commit("updateAllShiftData", allShiftData);
    },
    errorHandler({ commit }, err) {
      let errMessage = err.response.data.message;
      let showMessage = undefined;
      switch (errMessage) {
        case "SID_EXISTED":
          showMessage = "帳號已存在";
          break;
        case "LOGIN_FAILED":
          showMessage = "登入失敗";
          break;
        case "INVALID_FORMDATA":
          showMessage = "表單格式錯誤";
          break;
        case "WRONG_PASSWORD":
          showMessage = "密碼錯誤";
          break;
        case "NO_PERMISSION":
          commit("logout");
          showMessage = "帳號無效";
          break;
        case "INVALID_TOKEN":
          commit("logout");
          showMessage = "帳號無效";
          break;
        case "UNKNOWN_USER":
          showMessage = "未知的使用者";
          break;
        case "TOKEN_EXPIRED":
          commit("logout");
          showMessage = "請重新登入";
          break;
      }
      if (showMessage) {
        this._vm.$swal.fire({
          icon: "error",
          title: showMessage,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
  },
  modules: {},
});
