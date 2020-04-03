import axios from 'axios';
import { ACCESS_TOKEN } from 'utils/constants';
import config from 'utils/config';

const accessToken = localStorage.getItem(ACCESS_TOKEN);

const headers = {
  Authorization: accessToken ? `Bearer ${accessToken}` : '',
};

const axiosInstance = axios.create({
    baseURL: config.apiURL,
    headers,
});

const requestHandler = (request) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    request.headers['Authorization'] = `Bearer ${accessToken}`
    return request;
};

axiosInstance.interceptors.request.use((request) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    request.headers['Authorization'] = `Bearer ${token}`
    return request;
}), error => Promise.reject(error);

axiosInstance.interceptors.response.use(response => response.data, error => {
    const { response } = error;
    Promise.reject(response);
});

export default axiosInstance;