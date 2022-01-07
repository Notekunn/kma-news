import { disableOldTokens, setTokenToCache } from '@/services/cache'
import { signRefreshToken, signToken } from '@/services/jwt'
import { load } from 'env-defaults'
import moment from 'moment'
import { IToken, IUserDocument } from 'shared-types'

const { ACCESS_TOKEN_TTL, REFRESH_TOKEN_TTL, IS_REMOVE_OLD_TOKEN } = load({
  REFRESH_TOKEN_TTL: 7 * 24 * 60 * 60,
  ACCESS_TOKEN_TTL: 30 * 60,
  IS_REMOVE_OLD_TOKEN: false,
})
export default async function generateToken(user: IUserDocument) {
  if (IS_REMOVE_OLD_TOKEN) await disableOldTokens(user._id)
  const tokenExpiration = moment().add(ACCESS_TOKEN_TTL, 'seconds').toDate()
  const access_token = signToken(user)
  const refreshTokenExpiration = moment().add(REFRESH_TOKEN_TTL, 'seconds').toDate()
  const refresh_token = signRefreshToken(user)
  const token: IToken = {
    user: user._id,
    token: refresh_token,
    type: 'refresh',
    expiredAt: refreshTokenExpiration,
    lastTimeRefresh: new Date(),
    status: 'active',
  }
  await setTokenToCache(token)
  return {
    tokenExpiration,
    access_token,
    refreshTokenExpiration,
    refresh_token,
    user: {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatarURL: user.avatarURL,
    },
  }
}
