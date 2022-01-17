import { APIResponse, APIParameter } from '../types'
import client from '../axiosClient'

export const getOptionByName = (name: string) => {
  return client.get(`/options/${name}`) as Promise<APIResponse.GetOptionByName>
}

export const createOption = (params: APIParameter.CreateOption) => {
  return client.post(`/options`, params) as Promise<APIResponse.CreateOption>
}

export const updateOption = (params: APIParameter.UpdateOption) => {
  const { name, value } = params
  return client.patch(`/options/${params.name}`, { value }) as Promise<APIResponse.UpdateOption>
}
