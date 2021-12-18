import { IController } from '@/@types'
import { CategoryModel } from '@/models/category'
import { errorWrapper } from '@/services/error-wrapper'

export const getAll: IController = errorWrapper(async (req, res, next) => {
  const data = await CategoryModel.find({})
  res.json(data)
})
