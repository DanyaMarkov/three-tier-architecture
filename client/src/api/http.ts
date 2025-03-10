import axios from 'axios';

export const API_URL = 'http://localhost:5000/api/';
export const SERVER_URL = 'http://localhost:5000/';

const $api = axios.create({
    withCredentials: false,
    baseURL: API_URL
});

export default $api;
