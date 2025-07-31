import axios from "axios";

const axiosInterceptor = axios.create({
  baseURL: "https://bookings-json-server-api-production.up.railway.app/",
});

export default axiosInterceptor;
