import axios from 'axios'
import Store from '@/store'

const timeOut = 10000
const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  // baseURL: 'http://180.100.*.*:88/prod-api',
  withCredentials: true, // send cookies when cross-domain requests
  timeout: timeOut // request timeout 1
})

axiosInstance.interceptors.request.use(
  config => {
    const token = Store.getters.token
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  response => {
    // console.log(response)
    const res = response.data
    // console.log(res)
    const code = res.code
    if (code === 20000) {
      return res
    } else {
      return Promise.reject(res)
    }
  },
  error => {

  }
)

export default axiosInstance
