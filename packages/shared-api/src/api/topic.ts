import { APIParameter, APIResponse } from '../types'
import axiosClient from '../axiosClient'

export const getPostsOnTopic = (params: APIParameter.GetPostsOnTopic) => {
  const { topicId, ...rest } = params
  return axiosClient.request({
    url: `/channels/${topicId}/content`,
    params: rest,
  }) as Promise<APIResponse.GetPostsOnTopic>
}

export const getHomeTopics = () => {
  return axiosClient.get('/channels/homepage') as Promise<APIResponse.GetHomeTopics>
}
