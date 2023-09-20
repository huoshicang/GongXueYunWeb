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

// 获取签到
export const GetInfo = async (data) => {
  return await MyPost(`/user/info`, data);
}

// 删除用户
export const Del = async (data) => {
  return await MyPost(`/user/delSys`, data);
}

// 修改用户
export const modify = async (data) => {
  return await MyPost(`/user/modify`, data);
}

// 重置密码
export const reset = async (data) => {
  return await MyPost(`/user/reset`, data);
}

// 修改密码
export const change = async (data) => {
  return await MyPost(`/user/change`, data);
}


// 获取签到用户
export const CheckInfo = async (data) => {
  return await MyPost(`/user/CheckInfo`, data);
}

// 编辑签到用户
export const ModifyInfo = async (data) => {
  return await MyPost(`/user/ModifyInfo`,data);
}

// 删除签到用户
export const delCheck = async (data) => {
  return await MyPost(`/user/delCheck`, data);
}


