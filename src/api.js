import axios from "axios";

let endPoint = process.env.VUE_APP_SERVER_URL;

const userRequest = axios.create({
  baseURL: `${endPoint}/user`,
});

const shiftTimeRequest = axios.create({
  baseURL: `${endPoint}/shifttime`,
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
export const apiGetUserInfo = (sid) => userRequest.get(`/${sid}`);

// 換班相關
export const apiGetAllUserShiftTime = () => shiftTimeRequest.get("/all");
export const apiUpdateShiftTime = (sid, shiftTime) =>
  shiftTimeRequest.patch(`/${sid}`, shiftTime);

// 攔截器
userRequest.interceptors.request.use((req) => {
  let token = localStorage.getItem("token");
  if (token) {
    req.headers["Authorization"] = `Bearer ${token}`;
  }
  return req;
});

shiftTimeRequest.interceptors.request.use((req) => {
  let token = localStorage.getItem("token");
  if (token) {
    req.headers["Authorization"] = `Bearer ${token}`;
  }
  return req;
});
