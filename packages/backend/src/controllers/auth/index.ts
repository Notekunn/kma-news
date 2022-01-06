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

const SECRET = process.env.SECRET || 'secret_key_for_jwt'
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'secret_key_for_refresh'
const ACCESS_TOKEN_TTL = parseInt(process.env.ACCESS_TOKEN_TTL || '' + 30 * 60)
const REFRESH_TOKEN_TTL = parseInt(process.env.REFRESH_TOKEN_TTL || '' + 7 * 24 * 60 * 60)

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
      })
      .send(data)
  }
)

export const refreshToken: IController<{ refresh_token: string }> = errorWrapper(
  async (req, res, next) => {
    const { refresh_token: refreshToken } = req.body
    // Phải viết thêm hàm kiểm tra refresh token
    // Sau này sẽ lấy từ cookie thay vì body
    if (!refreshToken) throw new HttpException(401, 'Refresh token is required')
    const tokenData = await TokenModel.findOne({
      token: refreshToken,
      status: 'active',
      expiredAt: {
        $gte: new Date(),
      },
      type: 'refresh',
    })
    if (!tokenData) throw new HttpException(403, 'Refresh token is invalid')

    const { email, id } = jwt.verify(refreshToken, REFRESH_SECRET) as ITokenPayload

    const user = await UserModel.findOne({
      email: email,
    }).select(['_id', 'email', 'name', 'role', 'avatarURL'])

    if (user?.id !== id) throw new HttpException(403, 'Refresh token is invalid')

    const tokenExpiration = moment().add(ACCESS_TOKEN_TTL, 'seconds').toDate()
    const token = jwt.sign({ email, id }, SECRET, {
      expiresIn: ACCESS_TOKEN_TTL,
    })
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
    const { refresh_token: refreshToken } = req.body
    // Phải viết thêm hàm kiểm tra refresh token
    // Sau này sẽ lấy từ cookie thay vì body
    if (!refreshToken) throw new HttpException(401, 'Refresh token is required')
    const token = await TokenModel.findOneAndUpdate(
      {
        token: refreshToken,
      },
      {
        $set: {
          status: 'disabled',
        },
      }
    )
    client.del(`user_${token?.user._id}`)
    res.send({
      message: 'Logout success',
    })
  }
)
