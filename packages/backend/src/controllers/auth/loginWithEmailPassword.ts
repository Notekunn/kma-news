import HttpException from '@/exceptions/HttpException'
import { UserModel } from '@/models/user'
import { errorWrapper } from '@/services/error-wrapper'
import joi from 'joi'
import { IUser } from 'shared-types'
import generateToken from './generateToken'

const loginValidator = joi.object<Pick<IUser, 'email' | 'password'>>({
  password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  email: joi.string().email().required(),
})

export const loginWithEmailPassword = errorWrapper(async (req, res, next) => {
  const { error, value } = loginValidator.validate(req.body)
  if (error || !value) throw error
  const user = await UserModel.findOne({ email: value.email })
  if (!user || !user.checkPassword(value.password))
    throw new HttpException(401, 'Email/Password is not correct')
  const { refresh_token, refreshTokenExpiration, ...data } = await generateToken(user)
  res
    .cookie('refresh_token', refresh_token, {
      expires: refreshTokenExpiration,
      // path: '/',
      httpOnly: true,
      // signed: true,
    })
    .send(data)
})
