import axios from 'axios'

/** Default config for axios instance */
let config = {
  // baseURL: process.env.VUE_APP_BASE_API
  // baseURL: 'http://localhost:6000/api/v1/'
};

/** Creating the instance for axios */
const httpClient = axios.create(config);

/** Auth token interceptors */
const authInterceptor = config => {
  return config;
};

/** logger interceptors */
const loggerInterceptor = config => {
  return config;
};

/** Adding the request interceptors */
httpClient.interceptors.request.use(authInterceptor);
httpClient.interceptors.request.use(loggerInterceptor);

export default httpClient;
