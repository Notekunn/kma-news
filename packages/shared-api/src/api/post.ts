import client from '../axiosClient'
import { APIParameter, APIResponse } from '../types'

export const getAllPosts = (params: APIParameter.GetAllPosts) => {
  return client.get('/posts/', {
    params,
  }) as Promise<APIResponse.GetAllPosts>
}

export const getOnePost = (slug: string) => {
  return client.get(`/posts/${slug}`) as Promise<APIResponse.GetOnePost>
}

export const updatePost = (params: APIParameter.UpdatePost) => {
  const { _id, ...fieldToUpdate } = params
  return client.put(`/posts/${_id}`, fieldToUpdate) as Promise<APIResponse.UpdatePost>
}

export const createPost = (params: APIParameter.CreatePost) => {
  return client.post('/posts', params) as Promise<APIResponse.CreatePost>
}

export const deletePost = (_id: string) => {
  return client.delete(`/posts/${_id}`) as Promise<APIResponse.DeletePost>
}
