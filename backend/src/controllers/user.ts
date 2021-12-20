import joi from 'joi'
import { Request } from 'express'
import { IController, IUserModel, User } from '@/@types'
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

export const create: IController<User> = errorWrapper(async (req, res, next) => {
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

export const getOne: IController<User> = errorWrapper(async (req, res, next) => {
  const { id } = req.params
  const user = await UserModel.findById(id)
  if (!user) return next(new HttpException(404, 'User not found'))
  res.send(user)
})
const updateValidator = joi.object<User>({
  name: joi.string(),
  password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  email: joi.string().email(),
  avatarURL: joi.string().uri(),
  role: joi.string().valid('admin', 'writter', 'user'),
})

export const update: IController<User, 'id'> = errorWrapper(async (req, res, next) => {
  const user = req.context
  const { id } = req.params

  // Chỉ được chỉnh sửa nếu có quyền admin hoặc tự sửa chính mình
  // Không cần kiểm tra user vì đã có auth middleware rồi
  if (user?.role != 'admin' && user?.id != id) {
    return next(new HttpException(403, 'Unauthorized access'))
  }
  const { error, value } = updateValidator.validate(req.body)
  if (error) throw error
  // Chỉ admin mới có quyền sửa role
  if (value?.role && user?.role != 'admin') {
    return next(new HttpException(403, 'Unauthorized access'))
  }
  const data = await UserModel.findByIdAndUpdate(
    id,
    {
      ...value,
    },
    { new: true }
  )
  if (!data) return next(new HttpException(404, "User doesn't exist"))
  res.send(data)
})

export const remove: IController<User, 'id'> = errorWrapper(async (req, res, next) => {
  const user = req.context
  const { id } = req.params

  // Chỉ được xóa nếu có quyền admin
  // Không cần kiểm tra user vì đã có auth middleware rồi
  if (user?.role != 'admin') {
    return next(new HttpException(403, 'Unauthorized access'))
  }

  const data = await UserModel.findByIdAndDelete(id)
  if (!data) return next(new HttpException(404, "User doesn't exist"))
  res.send(data)
})
