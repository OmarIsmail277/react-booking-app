import axios from "axios";

const axiosInterceptor = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default axiosInterceptor;
