import jwt, { JwtPayload } from 'jsonwebtoken'
import joi from 'joi'
import { IController, User } from '@/@types'
import { UserModel } from '@/models/user'
import { errorWrapper } from '@/services/error-wrapper'

const SECRET = process.env.SECRET || 'secret_key_for_jwt'
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'secret_key_for_refresh'

const loginValidator = joi.object<Pick<User, 'email' | 'password'>>({
  password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  email: joi.string().email().required(),
})

export const login: IController<Pick<User, 'email' | 'password'>> = errorWrapper(
  async (req, res, next) => {
    const { error, value } = loginValidator.validate(req.body)
    if (error) throw error
    const user = await UserModel.findOne({
      email: value?.email,
    })
    if (!user || !user.checkPassword(value?.password || '')) {
      throw Error('Email/Password is not correct')
    }
    const payload: JwtPayload = {
      email: user.email,
      id: user.id,
    }

    const tokenExpiration = new Date(new Date().getTime() + 30 * 60 * 1000)
    const token = jwt.sign(payload, SECRET, {
      expiresIn: process.env.NODE_ENV === 'production' ? '30m' : '3d',
    })
    const refreshTokenExpiration = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
    const refreshToken = jwt.sign(payload, REFRESH_SECRET, {
      expiresIn: '7d',
    })
    res.send({
      token,
      tokenExpiration,
      refreshToken,
      refreshTokenExpiration,
      userId: user.id,
    })
  }
)

export const refreshToken: IController<{ refresh_token: string }> = errorWrapper(
  async (req, res, next) => {
    const { refresh_token } = req.body
    // Phải viết thêm hàm kiểm tra refresh token
    // Sau này sẽ lấy từ cookie thay vì body
    if (!refresh_token) throw new Error('Refresh token không hợp lệ')

    const { email, id } = jwt.verify(refresh_token, REFRESH_SECRET) as JwtPayload

    const tokenExpiration = new Date(new Date().getTime() + 30 * 60 * 1000)
    const token = jwt.sign({ email, id }, SECRET, {
      expiresIn: process.env.NODE_ENV === 'production' ? '30m' : '3d',
    })
    res.send({
      token,
      tokenExpiration,
      userId: id,
    })
  }
)
