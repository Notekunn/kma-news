import { APIParameter, APIResponse } from 'types'
import client from '../axiosClient'

export const getAllCategories = (params: APIParameter.GetAllCategories) => {
  return client.get('/categories/') as Promise<APIResponse.GetAllCategories>
}

export const getTreeCategories = (params: APIParameter.GetTreeCategories = {}) => {
  return client.get('/categories/tree', {
    params: params,
  }) as Promise<APIResponse.GetTreeCategories>
}

export const createCategory = (params: APIParameter.CreateCategory) => {
  return client.post('/categories/', params) as Promise<APIResponse.CreateCategory>
}

export const updateCategory = (params: APIParameter.UpdateCategory) => {
  const { _id, ...fieldToUpdate } = params
  return client.patch(`/categories/${_id}`, fieldToUpdate) as Promise<APIResponse.UpdateCategory>
}

export const deleteCategory = (_id: string) => {
  return client.delete(`/categories/${_id}`) as Promise<APIResponse.DeleteCategory>
}
