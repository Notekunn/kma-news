import jwt from 'jsonwebtoken'
import joi from 'joi'
import { User } from '../@types/index'
import { IController } from '../@types'
import { UserModel } from '../models/user'
import { errorWrapper } from '@/services/error-wrapper'

const SECRET_KEY = process.env.SECRET_KEY || 'secret_key_for_jwt'

export const getAll: IController = async (req, res) => {
  const users = await UserModel.find({})
  res.json(users)
}

const createValidator = joi.object<User>({
  name: joi.string().required(),
  password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  email: joi.string().email().required(),
  avatarURL: joi.string().uri(),
})

export const create: IController<User, {}> = errorWrapper(async (req, res, next) => {
  const { error, value } = createValidator.validate(req.body)
  if (error) throw error

  const { email, name, password, avatarURL } = value || {}
  const user = new UserModel({ email, name, password, avatarURL })
  const data = await user.save()
  res.send(data)
})

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
  }
)
