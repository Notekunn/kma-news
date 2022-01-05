import { UserModel } from '@/models/user'
import { IUserDocument } from 'shared-types'
import client from '@/redis'

const USER_CACHE_TTL = parseInt(process.env.USER_CACHE_TTL || '60') // Phut

export const getUserFromCache = async (id: string) => {
  const cached = await client.get(`user:${id}`)
  if (cached) return new UserModel(JSON.parse(cached))
  return undefined
}

export const setUserToCache = (user: IUserDocument) => {
  return client.set(`user:${user._id}`, JSON.stringify(user), {
    EX: USER_CACHE_TTL * 60,
    NX: true,
  })
}
