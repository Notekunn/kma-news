import client from '../axiosClient'
import { APIResponse, APIParameter } from '../types'

export const loginWithEmail = ({ email, password }: APIParameter.Login) => {
  return client.post(
    '/auth/login',
    { email, password },
    {
      withCredentials: true,
    }
  ) as Promise<APIResponse.Login>
}

export const refreshToken = (refresh_token: string) => {
  return client.request({
    url: '/auth/refresh',
    withCredentials: true,
  }) as Promise<APIResponse.Login>
}

export const getProfile = () => {
  return client.get('/users/me') as Promise<APIResponse.Profile>
}

export const logout = (refresh_token: string) => {
  return client.request({
    url: '/auth/logout',
    withCredentials: true,
  }) as Promise<APIResponse.Logout>
}
