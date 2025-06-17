import axios, { AxiosRequestConfig } from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_7bdLCN9mAkvssXwjjqiM4654LBHOLhiwuEDyaqZNMUrsqyS88OA6jC0MlNFwGGRE';
// axios.defaults.headers.common["x-api-key"] =
//   "e0c1cfae-90bc-4889-ba62-a4e0d629ff72";

// 請求攔截器
axios.interceptors.request.use(
  function (config) {
    // 在發送請求之前做些什麼
    // console.log('請求攔截器', config);
    return config;
  },
  function (error) {
    // 對請求錯誤做些什麼
    return Promise.reject(error);
  }
);

// 響應攔截器
axios.interceptors.response.use(
  function (response) {
    // 對響應數據做些什麼
    // 2xx 範圍內的狀態碼都會觸發此函數
    // console.log('響應攔截器', response);
    return response;
  },
  function (error) {
    // 超出 2xx 範圍的狀態碼都會觸發此函數
    if (error.response) {
      // 服務器返回了響應，但狀態碼不在 2xx 範圍
      return Promise.reject(error); // 確保錯誤被傳遞到 catch
    } else if (error.request) {
      // 請求已發出但沒有收到響應
      return Promise.reject(new Error('無服務器響應'));
    } else {
      // 發送請求時發生了某些事情
      return Promise.reject(new Error('請求設置錯誤'));
    }
  }
);

export default async function Request(config: AxiosRequestConfig<any>) {
  return axios(config)
    .then((res) => res.data)
    .catch((err) => err);
}
