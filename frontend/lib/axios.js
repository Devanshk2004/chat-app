import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? "http://localhost:5001/api" : "/api", // Updated to 5001
    withCredentials: true,
});
