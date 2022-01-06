import client from '../axiosClient'
import { APIResponse, APIParameter } from '../types'

export const loginWithEmail = ({ email, password }: APIParameter.Login) => {
  return client.request({
    method: 'POST',
    url: '/auth/login',
    data: { email, password },
    withCredentials: true,
  }) as Promise<APIResponse.Login>
}

export const refreshToken = () => {
  return client.request({
    method: 'POST',
    url: '/auth/refresh',
    withCredentials: true,
  }) as Promise<APIResponse.Login>
}

export const getProfile = () => {
  return client.get('/users/me') as Promise<APIResponse.Profile>
}

export const logout = () => {
  return client.request({
    method: 'POST',
    url: '/auth/logout',
    withCredentials: true,
  }) as Promise<APIResponse.Logout>
}
