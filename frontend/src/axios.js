import axios from 'axios';

const api = axios.create({
    baseURL: "https://backendlicoes.onrender.com/"
});

export default api;