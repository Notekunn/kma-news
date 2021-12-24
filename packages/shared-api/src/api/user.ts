import client from '../axiosClient'
import { APIResponse, APIParameter } from '../types'

export const getAllUsers = (params: APIParameter.Pagination) => {
  return client.get('/users', {
    params,
  }) as Promise<APIResponse.GetAllUsers>
}
