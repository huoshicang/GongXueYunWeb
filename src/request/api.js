import {MyGet, MyPost} from "@/request/MyAxios";

// 登录
export const Login = async (data) => {
  return await MyPost("/user/Login", data);
}

// 注册
export const Logup = async (data) => {
  return await MyPost("/user/Logup", data);
}
