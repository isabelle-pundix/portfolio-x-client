import axios from "axios";

const serveraxios = axios.create({
    baseURL: "https://localhost:5004/",
});

serveraxios.interceptors.response.use(undefined, error => {
    console.error(error);
    return Promise.reject(error);
})

export default serveraxios;
