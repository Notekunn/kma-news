import client from './axiosClient'

/**
 * Emails login
 * @param email
 * @param password
 */
export const loginWithEmail = (email: string, password: string) => {
  return client.post('/auth/login', { email, password }) as Promise<APIResponse.Login>
}
