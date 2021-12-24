import client from '../axiosClient'
import { APIResponse, APIParameter } from '../types'

export const loginWithEmail = ({ email, password }: APIParameter.Login) => {
  return client.post('/auth/login', { email, password }) as Promise<APIResponse.Login>
}

export const refreshToken = (refresh_token: string) => {
  return client.post('/auth/refresh', { refresh_token }) as Promise<APIResponse.Login>
}

export const getProfile = () => {
  return client.get('/users/me') as Promise<APIResponse.Profile>
}

export const logout = (refresh_token: string) => {
  return client.post('/auth/logout', { refresh_token }) as Promise<APIResponse.Logout>
}
