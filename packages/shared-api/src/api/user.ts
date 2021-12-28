import client from '../axiosClient'
import { APIResponse, APIParameter } from '../types'

export const getAllUsers = (params: APIParameter.Pagination) => {
  return client.get('/users', {
    params,
  }) as Promise<APIResponse.GetAllUsers>
}

export const createUser = (params: APIParameter.CreateUser) => {
  return client.post('/users', params) as Promise<APIResponse.CreateUser>
}

export const updateUser = (params: APIParameter.UpdateUser) => {
  const { _id, ...fieldToUpdate } = params
  return client.patch(`/users/${_id}`, fieldToUpdate) as Promise<APIResponse.UpdateUser>
}

export const deleteUser = (_id: string) => {
  return client.delete(`/users/${_id}`) as Promise<APIResponse.DeleteUser>
}
