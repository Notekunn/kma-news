import { APIParameter, APIResponse } from 'types'
import client from '../axiosClient'

export const getAllCategories = (params: APIParameter.GetAllCategories) => {
  return client.get('/categories/') as Promise<APIResponse.GetAllCategories>
}
