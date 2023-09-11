import {MyGet, MyPost} from "@/request/MyAxios";

// 登录
export const Login = async (data) => {
  return await MyPost("/user/Login", data);
}

// 注册
export const Logup = async (data) => {
  return await MyPost("/user/Logup", data);
}

// 注册签到信息
export const AddInfo = async (data) => {
  return await MyPost("/user/AddInfo", data);
}

// 更新标识
export const UpLog = async (data) => {
  return await MyGet(`/user/UpLog?username=${data}`);
}
