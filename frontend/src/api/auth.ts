import client from './axiosClient'

/**
 * Emails login
 * @param email
 * @param password
 */
export const loginWithEmail = (email: string, password: string) => {
  return client.post('/auth/login', { email, password }) as Promise<APIResponse.Login>
}

export const refreshToken = (refresh_token: string) => {
  return client.post('/auth/refresh', { refresh_token }) as Promise<APIResponse.Login>
}

export const getProfile = () => {
  return client.get('/users/me') as Promise<APIResponse.Profile>
}
