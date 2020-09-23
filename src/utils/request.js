import axios from 'axios'

// create an axios instance
const service = axios.create({
  baseURL: '/api',
  timeout: 10000, // request timeout
  withCredentials: true // send cookies when cross-domain requests
})

// request interceptor
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
