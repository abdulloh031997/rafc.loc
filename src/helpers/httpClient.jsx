import axios from 'axios';
import { API_URL } from './api';
import { getToken, removeToken } from './tokenStorage';
import { getLanguage } from './language';

axios.interceptors.response.use(response => {
    return response;
}, error => {
    console.log(error);
    if (error.response.status === 401 || error.response.status === 403) {
        removeToken();
        window.location.href = "/";
    } else {
        return Promise.reject(error);
    }
});

export const GetNotAuthInstance = () => {
    // const lan = getLanguage();
    const defaultOptions = {
        baseURL: API_URL,
        // params: {
        //     lan: lan,
        // },
    };
    return {
        get: (url, options = {}) =>
            axios.get(url, { ...defaultOptions, ...options }),
        post: (url, data, options = {}) =>
            axios.post(url, data, { ...defaultOptions, ...options }),
        put: (url, data, options = {}) =>
            axios.put(url, data, { ...defaultOptions, ...options }),
        delete: (url, options = {}) =>
            axios.delete(url, { ...defaultOptions, ...options }),
    };
};

export const GetAuthInstance = () => {
    const token = getToken();
    const lan = getLanguage();
    const defaultOptions = {
        baseURL: API_URL,
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
        },
        // params: {
        //   lan: lan,
        // },
    };

    return {
        get: (url, options = {}) =>
            axios.get(url, { ...defaultOptions, ...options }),
        post: (url, data, options = {}) =>
            axios.post(url, data, { ...defaultOptions, ...options }),
        put: (url, data, options = {}) =>
            axios.put(url, data, { ...defaultOptions, ...options }),
        delete: (url, options = {}) =>
            axios.delete(url, { ...defaultOptions, ...options }),
    };
};
