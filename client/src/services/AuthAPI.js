import axios from "axios";
const axiosInstance = axios.create({
    baseURL: process.env.BASE_URL
})

const login = ({ username, password }) => {
    return axiosInstance.post("/api/auth", { username, password });
}

export {
    login
}