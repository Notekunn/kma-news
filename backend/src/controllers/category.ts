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
  type: joi.string().valid('nav', 'single').default('single'),
})
export const create: IController = errorWrapper(async (req, res, next) => {
  const { error, value } = createValidator.validate(req.body)
  if (error) throw error
  const { title, description, type } = value || {}
  const category = new CategoryModel({ title, description, type })
  const data = await category.save()
  res.send(data)
})

const addSubItemValidator = joi.object({
  parrentId: joi.string().required(),
  childrenId: joi.string().required(),
  action: joi.string().valid('add', 'remove').default('add'),
})

export const addSubItem: IController = errorWrapper(async (req, res, next) => {
  const { error, value } = addSubItemValidator.validate(req.body)
  if (error) throw error
  const { parrentId, childrenId, action } = value || {}
  const data = await CategoryModel.findByIdAndUpdate(
    parrentId,
    {
      [action == 'add' ? '$addToSet' : '$unset']: {
        subItems: childrenId,
      },
      type: 'nav',
    },
    { new: true }
  )
  if (!data) throw new Error('Parrent not found')
  res.send(data)
})
