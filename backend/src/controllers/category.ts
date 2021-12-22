import joi from 'joi'
import { ICategory } from '@/@types/category'
import { IController } from '@/@types'
import { CategoryModel } from '@/models/category'
import { errorWrapper } from '@/services/error-wrapper'
import NotFoundExeption from '@/exceptions/NotFoundExeption'

export const getAll: IController = errorWrapper(async (req, res, next) => {
  const data = await CategoryModel.find({})
    .populate('parrent', ['title', 'slug'])
    .populate('ancestors', ['title', 'slug'])
    .sort({
      title: -1,
    })
    .select(['title', 'slug', 'parrent', 'ancestors'])

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

const createRootCategory = (title: string, description?: string) => {
  const category = new CategoryModel({ title, description })
  return category.save()
}

const createChildCategory = async (parrentId: string, title: string, description?: string) => {
  const parrent = await CategoryModel.findById(parrentId)
  if (!parrent) throw new NotFoundExeption('Parrent category not found')
  // Lưu mảng root -> ông -> cha
  const ancestors = [...parrent.ancestors, parrent._id]
  const category = new CategoryModel({ title, description, ancestors, parrent })
  const data = await category.save()
  return data
}

const showCategorySameRoot = async (root: ICategory['parrent']) => {
  if (!root) return []
  const data = await CategoryModel.find({
    ancestors: {
      $in: [root],
    },
  }).select(['title', 'slug'])
  return data
}

export const showCategoryByTree = errorWrapper(async (req, res, next) => {
  // Tìm cây không có cha
  const rootCategory = await CategoryModel.find({
    ancestors: {
      $size: 0,
    },
  }).select(['title', 'slug'])
  const data = await Promise.all(rootCategory.map((e) => showCategorySameRoot(e._id)))
  const result = rootCategory.map((e, i) => {
    return {
      slug: e.slug,
      title: e.title,
      subItems: data[i],
    }
  })
  res.send(result)
})
// const addSubItemValidator = joi.object({
//   parrentId: joi.string().required(),
//   childrenId: joi.string().required(),
//   action: joi.string().valid('add', 'remove').default('add'),
// })

// export const addSubItem: IController = errorWrapper(async (req, res, next) => {
//   const { error, value } = addSubItemValidator.validate(req.body)
//   if (error) throw error
//   const { parrentId, childrenId, action } = value || {}
//   const data = await CategoryModel.findByIdAndUpdate(
//     parrentId,
//     {
//       [action == 'add' ? '$addToSet' : '$unset']: {
//         subItems: childrenId,
//       },
//       type: 'nav',
//     },
//     { new: true }
//   )
//   if (!data) throw new Error('Parrent not found')
//   res.send(data)
// })
