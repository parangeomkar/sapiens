import axios from "axios";
const axiosInstance = axios.create({
    baseURL: process.env.BASE_URL
})

const updateUserPreferences = ({ username, theme }) => {
    return axiosInstance.patch("/api/user/" + username, { theme }, { withCredentials: true });
}

const getUserPreferences = (username) => {
    return axiosInstance.get("/api/user/" + username, { withCredentials: true });
}


axiosInstance.interceptors.request.use((config) => {
    // add token to authorization header if credentials required
    if (config.withCredentials)
        config.headers.Authorization = "bearer " + sessionStorage.getItem("token");

    return config;
});

axiosInstance.interceptors.response.use(
    res => res,
    err => {
        // in case of 401 staus, ask user to login
        if (err.response.status == 401)
            return { loginRequired: true }

        // if not 401 then throw error
        throw new Error(err);
    });


export {
    updateUserPreferences,
    getUserPreferences
}