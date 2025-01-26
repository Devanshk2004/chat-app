import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:5001/api", // Updated to 5001
    withCredentials: true,
});
