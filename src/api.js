import axios from "axios";

let endPoint = process.env.VUE_APP_SERVER_URL;

const userRequest = axios.create({
  baseURL: `${endPoint}/user`,
});

const loginRequest = axios.create({
  baseURL: `${endPoint}/login`,
});

const registerRequest = axios.create({
  baseURL: `${endPoint}/register`,
});

export const apiLogin = (data) => loginRequest.post("", data);
export const apiRegister = (data) => registerRequest.post("", data);

// 使用者相關

/**
 * 取得使用者基本資料
 * @param {Object} payload - Api 設定.
 * @param {string} payload.sid - 使用者的學號.
 * @param {string} payload.token - JWT token.
 */
export const apiGetUserInfo = (payload) =>
  userRequest.get(`/${payload.sid}`, {
    headers: { Authorization: `Bearer ${payload.token}` },
  });
