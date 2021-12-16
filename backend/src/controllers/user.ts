import joi from 'joi'
import { IController, User } from '@/@types'
import { UserModel } from '@/models/user'
import { errorWrapper } from '@/services/error-wrapper'
import HttpException from '@/exceptions/HttpException'

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

export const me: IController = errorWrapper(async (req, res, next) => {
  const user = req.context
  if (!user) return next(new HttpException(403, 'Unauthorized access'))
  res.send(user)
})
