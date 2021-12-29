import joi from 'joi'
import { ICategory } from 'shared-types'
import { IController } from 'shared-types'
import { CategoryModel } from '@/models/category'
import { errorWrapper } from '@/services/error-wrapper'
import { Types } from 'mongoose'
export const getAll: IController = errorWrapper(async (req, res, next) => {
  const data = await CategoryModel.find({})
    .populate('parrent', ['title', 'slug'])
    .sort({
      title: 1,
    })
    .select(['title', 'slug', 'parrent', 'level'])

  res.json(data)
})

const createValidator = joi.object({
  title: joi.string().required(),
  description: joi.string(),
  parrentId: joi.string(),
})

export const create: IController = errorWrapper(async (req, res, next) => {
  const { error, value } = createValidator.validate(req.body)
  if (error || !value) throw error
  const { title, description, parrentId } = value
  let parrent = null
  const categoryId = new Types.ObjectId()
  if (parrentId) {
    parrent = await CategoryModel.findByIdAndUpdate(parrentId, {
      $addToSet: {
        children: categoryId,
      },
    })
  }
  const category = new CategoryModel({
    _id: categoryId,
    title,
    description,
    parrent: parrent?._id,
    level: (parrent?.level || 0) + 1,
  })
  const data = await category.save()
  res.send(data)
})

export const showCategoryByTree = errorWrapper(async (req, res, next) => {
  // Show đến level 4
  const result = await CategoryModel.find({
    level: 1,
  })
    .populate({
      path: 'children',
      select: ['title', 'slug', 'description'],
      sort: {
        title: 1,
      },
      populate: {
        path: 'children',
        select: ['title', 'slug', 'description'],
        sort: {
          title: 1,
        },
        populate: {
          path: 'children',
          select: ['title', 'slug', 'description'],
          sort: {
            title: 1,
          },
        },
      },
    })
    .select(['title', 'slug', 'description'])
    .sort({ title: 1 })

  res.send(result)
})
