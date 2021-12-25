import jwt from 'jsonwebtoken'
import moment from 'moment-timezone'
import joi from 'joi'
import { IController, IUser, ITokenPayload } from 'shared-types'
import { UserModel } from '@/models/user'
import { TokenModel } from '@/models/token'
import { errorWrapper } from '@/services/error-wrapper'
import HttpException from '@/exceptions/HttpException'

const SECRET = process.env.SECRET || 'secret_key_for_jwt'
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'secret_key_for_refresh'
const ACCESS_TOKEN_LIVE = parseInt(process.env.ACCESS_TOKEN_LIVE || '' + 30 * 60)
const REFRESH_TOKEN_LIVE = parseInt(process.env.REFRESH_TOKEN_LIVE || '' + 7 * 24 * 60 * 60)
const TIMEZONE = process.env.TIMEZONE || 'Asia/Ho_Chi_Minh'

const loginValidator = joi.object<Pick<IUser, 'email' | 'password'>>({
  password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  email: joi.string().email().required(),
})

export const login: IController<Pick<IUser, 'email' | 'password'>> = errorWrapper(
  async (req, res, next) => {
    const { error, value } = loginValidator.validate(req.body)
    if (error) throw error
    const user = await UserModel.findOne({
      email: value?.email,
    })
    if (!user || !user.checkPassword(value?.password || '')) {
      throw new HttpException(401, 'Email/Password is not correct')
    }
    const payload: ITokenPayload = {
      email: user.email,
      id: user._id,
    }

    const tokenExpiration = moment.tz(TIMEZONE).add(ACCESS_TOKEN_LIVE, 'seconds').toDate()
    const token = jwt.sign(payload, SECRET, {
      expiresIn: ACCESS_TOKEN_LIVE,
    })
    const refreshTokenExpiration = moment.tz(TIMEZONE).add(REFRESH_TOKEN_LIVE, 'seconds').toDate()
    const refreshToken = jwt.sign(payload, REFRESH_SECRET, {
      expiresIn: REFRESH_TOKEN_LIVE,
    })
    // Vô hiệu hóa token cũ
    await TokenModel.updateMany(
      {
        user: user._id,
        type: 'refresh',
        $or: [
          {
            expiredAt: {
              $lt: moment.tz(TIMEZONE).toDate(),
            },
          },
          //   {
          //     status: 'active',
          //   },
        ],
      },
      {
        $set: {
          status: 'disabled',
        },
      }
    )
    const tokenData = new TokenModel({
      token: refreshToken,
      user: user._id,
      expiredAt: refreshTokenExpiration,
      type: 'refresh',
    })
    await tokenData.save()
    res.send({
      access_token: token,
      tokenExpiration,
      refresh_token: refreshToken,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatarURL: user.avatarURL,
      },
    })
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
        $gte: moment.tz(TIMEZONE).toDate(),
      },
      type: 'refresh',
    })
    if (!tokenData) throw new HttpException(403, 'Refresh token is invalid')

    const { email, id } = jwt.verify(refreshToken, REFRESH_SECRET) as ITokenPayload

    const user = await UserModel.findOne({
      email: email,
    }).select(['_id', 'email', 'name', 'role', 'avatarURL'])

    if (user?.id !== id) throw new HttpException(403, 'Refresh token is invalid')

    const tokenExpiration = moment.tz(TIMEZONE).add(ACCESS_TOKEN_LIVE, 'seconds').toDate()
    const token = jwt.sign({ email, id }, SECRET, {
      expiresIn: ACCESS_TOKEN_LIVE,
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
    const token = await TokenModel.updateOne(
      {
        token: refreshToken,
      },
      {
        $set: {
          status: 'disabled',
        },
      }
    )
    res.send({
      message: 'Logout success',
    })
  }
)
