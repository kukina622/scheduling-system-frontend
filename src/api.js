import axios from "axios";

let endPoint = process.env.VUE_APP_SERVER_URL;

// const userRequest = axios.create({
//   baseURL: `${baseURL}/user`,
// });

const loginRequest = axios.create({
  baseURL: `${endPoint}/login`,
});

const registerRequest = axios.create({
  baseURL: `${endPoint}/register`,
});

export const apiLogin = (data) => loginRequest.post("", data);
export const apiRegister = (data) => registerRequest.post("", data);

// export const apiGetUserInfo = (data) => loginRequest.post("", data);