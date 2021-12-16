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
    const token = jwt.sign(payload, SECRET, {
      expiresIn: '30m',
    })
    const tokenExpiration = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
    res.send({ token, tokenExpiration, userId: user.id })
  }
)
