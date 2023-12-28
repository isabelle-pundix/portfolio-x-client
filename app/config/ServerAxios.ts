import axios from "axios";
import { Constants } from "../constants";

const serveraxios = axios.create({
    baseURL: "https://localhost:5000/",
});

serveraxios.interceptors.response.use(undefined, error => {
    console.error(error);
    return Promise.reject(error);
})

export default serveraxios;