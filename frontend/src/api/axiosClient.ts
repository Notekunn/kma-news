import axios, { AxiosResponse } from 'axios'
import queryString from 'query-string'
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8888',
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => JSON.stringify(params),
})

axiosClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token')
  console.log(config)
  return config
})

axiosClient.interceptors.response.use(
  (response) => {
    if (response?.data) return response.data
    return response
  },
  (error) => {
    if (error?.response?.data?.message) {
      return Promise.reject(error.response.data.message)
    }
    if (error?.response?.data?.error?.message) {
      return Promise.reject(error.response.data.error.message)
    }
    if (error?.response?.data?.error?.errors) {
      return Promise.reject(error.response.data.error.errors)
    }
    if (error?.response?.data?.error) {
      return Promise.reject(error.response.data.error)
    }
    return Promise.reject(error)
  }
)
export default axiosClient
