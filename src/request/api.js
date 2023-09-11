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

// 删除用户
export const Del = async (data) => {
  return await MyPost(`/user/del`, data);
}

// 修改用户
export const modify = async (data) => {
  return await MyPost(`/user/modify`, data);
}

// 重置密码
export const reset = async (data) => {
  return await MyPost(`/user/reset`, data);
}

// 获取用户
export const CheckInfo = async (data) => {
  return await MyGet(`/user/CheckInfo?username=${data}`);
}

// 获取签到人员
export const GetInfo = async (data) => {
  return await MyPost(`/user/info`, data);
}
