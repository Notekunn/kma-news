import joi from 'joi'
import { ICategory, ICategoryDocument } from '@/@types/category'
import { IController } from '@/@types'
import { CategoryModel } from '@/models/category'
import { errorWrapper } from '@/services/error-wrapper'
import NotFoundExeption from '@/exceptions/NotFoundExeption'

export const getAll: IController = errorWrapper(async (req, res, next) => {
  const data = await CategoryModel.find({})
  res.json(data)
})
const createValidator = joi.object<ICategory>({
  title: joi.string().required(),
  description: joi.string(),
  parrent: joi.string(),
})
export const create: IController = errorWrapper(async (req, res, next) => {
  const { error, value } = createValidator.validate(req.body)
  if (error || !value) throw error
  const { title, description, parrent } = value

  if (!parrent) {
    // Root Category
    const data = await createRootCategory(title, description)
    res.send(data)
  } else {
    const data = await createChildCategory(parrent.toString(), title, description)
    res.send(data)
  }
})

export const createRootCategory = (title: string, description?: string) => {
  const category = new CategoryModel({ title, description })
  return category.save()
}
export const createChildCategory = async (
  parrentId: string,
  title: string,
  description?: string
) => {
  const parrent = await CategoryModel.findById(parrentId)
  if (!parrent) throw new NotFoundExeption('Parrent category not found')
  const ancestors = [parrent._id, ...parrent.ancestors]
  const category = new CategoryModel({ title, description, ancestors, parrent })
  const data = await category.save()
  return data
}

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
