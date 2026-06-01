import axios from "axios";

const data = localStorage.getItem('chatuser')
const tokenData = data ? JSON.parse(data) : '' 
const token = tokenData.token;
const axiosURL = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
         Authorization: `Bearer ${token}`
    }
});

export default axiosURL;