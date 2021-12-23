import axios from 'axios'
import { refreshToken } from './api/auth'
import { APIResponse } from './types'
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8888',
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => JSON.stringify(params),
})

axiosClient.interceptors.request.use(async (config) => {
  const access_token = localStorage.getItem('access_token')
  if (access_token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${access_token}`,
    }
  }
  return config
})
let refreshTokenRequest: Promise<APIResponse.Login> | null = null
axiosClient.interceptors.response.use(
  (response) => {
    if (response?.data) return response.data
    return response
  },
  (error) => {
    // Token hết hạn
    if (error?.response?.status === 401) {
      console.log('Token expired...')
      const refresh_token = localStorage.getItem('refresh_token')
      if (!!refresh_token) {
        refreshTokenRequest = refreshTokenRequest || refreshToken(refresh_token)
        return refreshTokenRequest
          .then((data) => {
            localStorage.setItem('access_token', data.access_token)
            refreshTokenRequest = null
            return axiosClient.request(error.config)
          })
          .catch((err) => {
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            refreshTokenRequest = null
          })
      }
    }
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
