import axios, { AxiosRequestConfig } from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_7bdLCN9mAkvssXwjjqiM4654LBHOLhiwuEDyaqZNMUrsqyS88OA6jC0MlNFwGGRE';
// axios.defaults.headers.common["x-api-key"] =
//   "e0c1cfae-90bc-4889-ba62-a4e0d629ff72";

// 請求攔截器
axios.interceptors.request.use(
  function (config) {
    // 在發送請求之前做些什麼
    console.log('請求攔截器', config);
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
    console.log('響應攔截器', response);
    return response;
  },
  function (error) {
    // 對響應錯誤做些什麼
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 處理未授權錯誤
          break;
        case 404:
          // 處理資源不存在錯誤
          break;
        // 其他狀態碼處理...
      }
    }
    return Promise.reject(error);
  }
);

export default async function Request(config: AxiosRequestConfig<any>) {
  return axios(config)
    .then((res) => res)
    .catch((err) => err);
}
