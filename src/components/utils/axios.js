import axios from 'axios'
import { BASE_URL } from '../../api/constans'

const api = axios.create({
    baseURL: BASE_URL,
})

api.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 401) {
        console.log("You're not authorized")
        window.location.href = "http://84.201.179.250:3000/oauth2/authorize"
      }
      return Promise.reject(error);
    },
  );

export default api