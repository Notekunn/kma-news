import { UserModel } from '@/models/user'
import { IUserDocument, IToken } from 'shared-types'
import client from '@/redis'
import { load } from 'env-defaults'

const { USER_CACHE_TTL } = load({
  USER_CACHE_TTL: 60,
})

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

export const deleteUserFromCache = (id: string) => {
  return client.del(`user:${id}`)
}

export const getTokenFromCache = async (token: string) => {
  const cached = await client.get(`token:${token}`)
  if (cached) {
    const data = JSON.parse(cached) as IToken
    return data
  }
  return undefined
}
export const setTokenToCache = async (token: IToken) => {
  await client.sAdd(`user_token:${token.user}`, token.token)
  const data = await client.set(`token:${token.token}`, JSON.stringify(token), {
    EX: new Date(token.expiredAt).getTime() - Date.now(),
    NX: true,
  })
  return data
}

export const deleteTokenFromCache = (token: string) => {
  return client.del(`token:${token}`)
}

export const disableOldTokens = async (userId: IToken['token']) => {
  const tokensToDisable = await client.sMembers(`user_token:${userId}`)
  if (tokensToDisable.length == 0) return
  await Promise.all(tokensToDisable.map((tk) => client.expire(`token:${tk}`, 0)))
  await client.sRem(`user_token:${userId}`, tokensToDisable)
}
