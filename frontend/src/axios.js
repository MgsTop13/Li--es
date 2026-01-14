import axios from 'axios';

const api = axios.create({
    baseURL: "https://backlicao.onrender.com"
});

export default api;