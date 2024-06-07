import axios from "axios";

//utils
import { getCookie, setCookie } from "../utils/cookie";
import { getNewToken } from "../services/token";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, //import az file .env baraye amniate bishtar
  headers: {
    "Content-Type": "application/json",
  },
});

//agar accessCookie vojud dasht, set kon headers ro dar harja estefade shode
api.interceptors.request.use(
  (request) => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      request.headers["Authorization"] = `bearer ${accessToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//gereftane accesToken jadid be vasile refreshToken
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // console.log(originalRequest);
    /* _retry : Yek ficher jaleb az axios hast ke mishe yek req ro mojadad ersal bekonim */
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; //true ke beshe dobare ersal kard

      const res = await getNewToken();
      if (!res?.response) return;
      // console.log(res);
      setCookie(res.response.data);

      return api(originalRequest);
    }
  }
);
export default api;
