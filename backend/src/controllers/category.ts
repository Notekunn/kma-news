import joi from 'joi'
import { Category, IController } from '@/@types'
import { CategoryModel } from '@/models/category'
import { errorWrapper } from '@/services/error-wrapper'

export const getAll: IController = errorWrapper(async (req, res, next) => {
  const data = await CategoryModel.find({})
  res.json(data)
})
const createValidator = joi.object<Category>({
  title: joi.string().required(),
  description: joi.string(),
})
export const create: IController = errorWrapper(async (req, res, next) => {
  const { error, value } = createValidator.validate(req.body)
  if (error) throw error
  const { title, description } = value || {}
  const category = new CategoryModel({ title, description })
  const data = await category.save()
  res.send(data)
})
