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
