import axios from "axios";
const axiosInstance = axios.create({
    baseURL: "http://localhost:5000"
})

const login = ({ username, password }) => {
    return axiosInstance.post("/api/auth", { username, password });
}

export {
    login
}