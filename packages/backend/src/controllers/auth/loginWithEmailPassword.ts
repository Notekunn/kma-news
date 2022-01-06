import HttpException from '@/exceptions/HttpException'
import { UserModel } from '@/models/user'
import { disableOldTokens } from '@/services/cache'
import { signRefreshToken, signToken } from '@/services/jwt'
import { load } from 'env-defaults'
import moment from 'moment'

const { ACCESS_TOKEN_TTL, REFRESH_TOKEN_TTL, IS_REMOVE_OLD_TOKEN } = load({
  REFRESH_TOKEN_TTL: 7 * 24 * 60 * 60,
  ACCESS_TOKEN_TTL: 30 * 60,
  IS_REMOVE_OLD_TOKEN: false,
})

export const loginWithEmailPassword = async (email: string, password: string) => {
  const user = await UserModel.findOne({ email })
  if (!user || !user.checkPassword(password))
    throw new HttpException(401, 'Email/Password is not correct')
  if (IS_REMOVE_OLD_TOKEN) await disableOldTokens(user._id)
  const tokenExpiration = moment().add(ACCESS_TOKEN_TTL, 'seconds').toDate()
  const access_token = signToken(user)
  const refreshTokenExpiration = moment().add(REFRESH_TOKEN_TTL, 'seconds').toDate()
  const refresh_token = signRefreshToken(user)
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
