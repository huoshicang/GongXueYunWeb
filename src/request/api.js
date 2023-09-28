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

// 获取周报
export const getWeekly = async (data) => {
  return await MyPost(`/Weekly/data`, data);
}

// 删除周报
export const delWeekly = async (data) => {
  return await MyPost(`/Weekly/del`, data);
}

// 编辑周报
export const modifyWeekly = async (data) => {
  return await MyPost(`/Weekly/modify`, data);
}

// 添加周报
export const addWeekly = async (data) => {
  return await MyPost(`/Weekly/add`, data);
}

// 获取月报
export const getMonth = async (data) => {
  return await MyPost(`/Month/data`, data);
}

// 删除月报
export const delMonth = async (data) => {
  return await MyPost(`/Month/del`, data);
}

// 编辑月报
export const modifyMonth = async (data) => {
  return await MyPost(`/Month/modify`, data);
}

// 添加月报
export const addMonth = async (data) => {
  return await MyPost(`/Month/add`, data);
}

// 签到任务
export const checkQuest = async (data) => {
  return await MyPost(`/quest/check`, data);
}



