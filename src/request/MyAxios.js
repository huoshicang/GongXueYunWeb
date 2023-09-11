import axios from "axios";
import {useCounterStore} from '@/pinia'

const pinia = useCounterStore()

const MyGet = (url) => {
  return axios
      .get(url,
          {
            headers: {
              "Authorization": pinia.UserData.token
            }
          }
      )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
}

const MyPost = (url, data) => {
  return axios.post(url, data, {
    headers: {
      "Authorization": pinia.UserData.token
    }
  })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })

}
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  return Promise.reject(error);
});


export {MyGet, MyPost}
