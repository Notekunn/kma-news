import jwt from 'jsonwebtoken'
import moment from 'moment-timezone'
import joi from 'joi'
import { IController, IUser, ITokenPayload } from 'shared-types'
import { UserModel } from '@/models/user'
import { TokenModel } from '@/models/token'
import { errorWrapper } from '@/services/error-wrapper'
import HttpException from '@/exceptions/HttpException'
import client from '@/redis'
import { loginWithEmailPassword } from './loginWithEmailPassword'
import { deleteTokenFromCache, getTokenFromCache } from '@/services/cache'
import { signToken, verifyRefreshToken } from '@/services/jwt'

const ACCESS_TOKEN_TTL = parseInt(process.env.ACCESS_TOKEN_TTL || '' + 30 * 60)

const loginValidator = joi.object<Pick<IUser, 'email' | 'password'>>({
  password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  email: joi.string().email().required(),
})

export const login: IController<Pick<IUser, 'email' | 'password'>> = errorWrapper(
  async (req, res, next) => {
    const { error, value } = loginValidator.validate(req.body)
    if (error || !value) throw error
    const data = await loginWithEmailPassword(value.email, value.password)
    const { access_token, tokenExpiration, user, refresh_token, refreshTokenExpiration } = data
    res
      .cookie('refresh_token', refresh_token, {
        expires: refreshTokenExpiration,
        // path: '/',
        httpOnly: true,
        // signed: true,
      })
      .send({
        access_token,
        tokenExpiration,
        user,
      })
  }
)

export const refreshToken: IController<{ refresh_token: string }> = errorWrapper(
  async (req, res, next) => {
    const refreshToken = req.cookies?.refresh_token

    if (!refreshToken) throw new HttpException(401, 'Refresh token is required')

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

    res.clearCookie('refresh_token').send({
      message: 'Logout success',
    })
  }
)
