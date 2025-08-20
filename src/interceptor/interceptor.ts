import axios from "axios";

export const AxiosInterceptor = axios.create({
  baseURL: "https://fast-api-dnk5.vercel.app",
});
