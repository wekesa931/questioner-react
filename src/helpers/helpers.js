import axios from 'axios';
import promise from 'promise';

const instance = axios.create();

instance.interceptors.request.use( config => {
  const access_token = localStorage.getItem('currentuser');

  if (access_token) {
        config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
}, function (error) {
   return promise.reject(error);
});

export default instance;