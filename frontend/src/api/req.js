import axios from "axios";
import router from "../router";
import { useAuthStore } from "../store/auth";

const errorHandler = (state, msg) => {
  switch (state) {
    case 400:
      console.log("login fail" + msg);
      break;
    case 401:
      console.log("axios errorHandler : 401 Auth Fail");
      console.log("axios errorHandler : " + msg);
      router.push({ name: "Refresh" });
      break;
    case 403:
      console.log("unauthorized");
      break;
    case 404:
      console.log("not found");
      break;
    default:
      console.log("undefined error" + msg);
  }
};

console.log(import.meta.env.VITE_APP_API_URL);

var instance = axios.create({
  baseURL:
    (import.meta.env.VITE_APP_API_URL ) ,
});


instance.interceptors.request.use(
  (config) => {
    const store = useAuthStore();
    store.get_access_token && (config.headers.Authorization = `Bearer ${store.get_access_token }`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response) {
      errorHandler(response.status, response.data);
      return Promise.reject(error);
    } else {
      if (!window.navigator.onLine) {
        console.log("offline");
      } else {
        return Promise.reject(error);
      }
    }
  }
);

export default function (method, url, data = null , headers = null) {
  method = method.toUpperCase();

  if( headers ){
    instance.defaults.headers.common = headers;
  }

  switch (method) {
    case "GET":
      let composeUrl = `${url}${data && Object.values(data)[0] ? "/" + Object.values(data)[0] : ""}`;
      let params = {};
      if (data && Object.keys(data).length > 1) {
        let i = 0;
        for (let j in data) if (i++ > 0) params[j] = data[j];
      } else {
        params = null;
      }
      return instance.get(composeUrl, { ...params } );
    case "POST":
      return instance.post(url, data);
    case "PUT":
      return instance.put(url, data);
    case "DELETE":
      return instance.delete(url, data);
    case "PATCH":
      return instance.patch(url, data);
    default:
      console.log("unknow methods" + method);
      return false;
  }
}
