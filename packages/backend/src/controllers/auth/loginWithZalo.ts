import { errorWrapper } from '@/services/error-wrapper'
import { IController } from 'shared-types'
import axios from 'axios'
import qs from 'qs'
import HttpException from '@/exceptions/HttpException'
import { load } from 'env-defaults'
import { createUserIfNotExist } from './createUser'
import generateToken from './generateToken'

const { ZALO_SECRET_KEY, ZALO_APP_ID } = load({
  ZALO_SECRET_KEY: '',
  ZALO_APP_ID: '1234',
})
const client = axios.create({
  baseURL: 'https://oauth.zaloapp.com/v4',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    secret_key: ZALO_SECRET_KEY,
  },
})
// console.log(ZALO_SECRET_KEY, ZALO_APP_ID)
export const getTokenFromAuthorizationCode = async (code: string) => {
  const { data } = await client.post(
    '/access_token',
    qs.stringify({
      grant_type: 'authorization_code',
      code,
      app_id: ZALO_APP_ID,
    })
  )
  return data as {
    access_token: string
    refresh_token: string
  }
}

export const getUserDataFromToken = async (token: string) => {
  const { data } = await axios.request({
    url: 'https://graph.zalo.me/v2.0/me?fields=id,name,picture.type(large)',
    headers: {
      access_token: token,
    },
  })
  return data as {
    id: string
    name: string
    picture?: {
      data?: {
        url?: string
      }
    }
  }
}

export const loginWithZalo: IController = errorWrapper(async (req, res, next) => {
  const { code } = req.query
  const { access_token: zaloAccessToken } = await getTokenFromAuthorizationCode(code)
  if (!zaloAccessToken) return next(new HttpException(400, 'Login failed'))
  const { id, name, picture } = await getUserDataFromToken(zaloAccessToken)
  const email = `${id}@zalo.com.vn`
  const password = `password_${Date.now()}`
  const account = await createUserIfNotExist(email, password, name, 'user', picture?.data?.url)
  if (!account) return next(new HttpException(400, 'Cannot create account'))
  const { refresh_token, refreshTokenExpiration, ...data } = await generateToken(account)
  res
    .cookie('refresh_token', refresh_token, {
      expires: refreshTokenExpiration,
      // path: '/',
      httpOnly: true,
      // signed: true,
    })
    .send(data)
})
