import axios, { AxiosRequestConfig, AxiosResponse } from "axios";


const axiosAuth = axios.create({
    baseURL: 'http://api.training.div3.pgtest.co/api/v1',
    headers: {
        'Content-Type': 'application/json'
    }
})

// Add a request interceptor
axiosAuth.interceptors.request.use(function (config: AxiosRequestConfig) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axiosAuth.interceptors.response.use(function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default axiosAuth