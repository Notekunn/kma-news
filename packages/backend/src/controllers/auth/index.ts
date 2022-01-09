import moment from 'moment'
import { IController } from 'shared-types'
import { UserModel } from '@/models/user'
import { errorWrapper } from '@/services/error-wrapper'
import HttpException from '@/exceptions/HttpException'
import { deleteTokenFromCache, getTokenFromCache } from '@/services/cache'
import { signToken, verifyRefreshToken } from '@/services/jwt'
import { load } from 'env-defaults'

const { COOKIE_DOMAIN, ACCESS_TOKEN_TTL } = load({
  COOKIE_DOMAIN: 'kma-news.tech',
  ACCESS_TOKEN_TTL: 30 * 60,
})
export const refreshToken: IController<{ refresh_token: string }> = errorWrapper(
  async (req, res, next) => {
    const refreshToken = req.cookies?.refresh_token

    if (!refreshToken) throw new HttpException(403, 'Refresh token is required')

    const tokenData = await getTokenFromCache(refreshToken)

    if (!tokenData) throw new HttpException(403, 'Refresh token is expired')

    const { email, _id } = verifyRefreshToken(tokenData.token)

    const user = await UserModel.findOne({
      email: email,
    }).select(['_id', 'email', 'name', 'role', 'avatarURL'])

    if (!user || user._id != _id) throw new HttpException(403, 'Refresh token is invalid')

    const tokenExpiration = moment().add(ACCESS_TOKEN_TTL, 'seconds').toDate()
    const token = signToken(user)
    res.send({
      access_token: token,
      tokenExpiration,
      user,
    })
  },
  (error) => {
    if (error instanceof HttpException) {
      return error
    }
    return new HttpException(403, 'Refresh token is invalid')
  }
)

export const logout: IController<{ refresh_token: string }> = errorWrapper(
  async (req, res, next) => {
    const refreshToken = req.cookies?.refresh_token
    if (!refreshToken) throw new HttpException(401, 'Refresh token is required')

    const tokenData = await deleteTokenFromCache(refreshToken)
    res
      .clearCookie('refresh_token', {
        domain: COOKIE_DOMAIN,
      })
      .send({
        message: 'Logout success',
      })
  }
)
