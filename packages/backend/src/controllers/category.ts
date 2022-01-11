import joi from 'joi'
import { ICategory, IController } from 'shared-types'
import { CategoryModel } from '@/models/category'
import { errorWrapper } from '@/services/error-wrapper'
import { Types } from 'mongoose'
import NotFoundExeption from '@/exceptions/NotFoundExeption'
import client from '@/redis'
import HttpException from '@/exceptions/HttpException'
export const getAll: IController = errorWrapper(async (req, res, next) => {
  const data = await CategoryModel.find({}).populate('parrent', ['title', 'slug']).sort({
    title: 1,
  })
  // .select(['title', 'slug', 'parrent', 'level', 'url'])

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
    parrent: parrent?._id || null,
  })
  const data = await category.save()
  await client.del('tree_categories')
  res.send(data)
})

const getTreeValidator = joi.object({
  page: joi.number().integer().min(1).default(1),
  limit: joi.number().integer().min(1).default(10),
  show_all: joi.boolean().default(false),
})

export const showCategoryByTree = errorWrapper(async (req, res, next) => {
  const user = req.context
  const { error, value } = getTreeValidator.validate(req.query)
  if (error || !value) throw error
  if (value.show_all && !user?.validRole('admin')) {
    throw new HttpException(403, 'Không có quyền truy cập')
  }
  // Nếu không show all thì đọc thử từ cache ra
  if (!value.show_all) {
    const cachedResultRaw = await client.get('tree_categories')
    if (cachedResultRaw) {
      res.send(JSON.parse(cachedResultRaw))
      return
    }
  }
  const matchFilter = value.show_all ? { parrent: null } : { parrent: null, isShow: true }

  const result = await CategoryModel.aggregate([
    {
      $match: matchFilter,
    },
    {
      $graphLookup: {
        from: 'categories',
        startWith: '$_id',
        connectFromField: '_id',
        connectToField: 'parrent',
        as: 'subItems',
      },
    },
    {
      $sort: {
        title: 1,
        'subItems.title': 1,
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        slug: 1,
        description: 1,
        url: {
          $concat: ['/the-loai', '/', '$slug'],
        },
        isShow: 1,
        subItems: {
          $map: {
            input: '$subItems',
            as: 'item',
            in: {
              _id: '$$item._id',
              title: '$$item.title',
              slug: '$$item.slug',
              description: '$$item.description',
              isShow: '$$item.isShow',
              url: {
                $concat: ['/the-loai', '/', '$slug'],
              },
            },
          },
        },
      },
    },
    {
      $skip: (value.page - 1) * value.limit,
    },
    {
      $limit: value.limit,
    },
  ])
  // Nếu không show all thì lưu vào cache
  if (!value.show_all) {
    await client.set('tree_categories', JSON.stringify(result), {
      EX: 24 * 60 * 60,
    })
  }
  res.send(result)
})
const updateValidator = joi.object({
  title: joi.string(),
  slug: joi.string().pattern(new RegExp('^[a-zA-Z0-9-]+$')),
  description: joi.string(),
  parrentId: joi.string().allow(null),
})

export const update: IController<ICategory, 'id'> = errorWrapper(async (req, res, next) => {
  const { id } = req.params
  const { error, value } = updateValidator.validate(req.body)
  if (error || !value) throw error
  const { parrentId, ...fieldToChange } = value
  if (parrentId !== undefined) {
    fieldToChange['$set'] = {
      parrent: parrentId,
    }
  }
  const category = await CategoryModel.findByIdAndUpdate(id, fieldToChange, { new: true })
  if (!category) throw new NotFoundExeption('Category not found')
  await client.del('tree_categories')
  // Đổi parrent id
  res.send(category)
})

export const remove: IController = errorWrapper(async (req, res, next) => {
  const { id } = req.params
  const category = await CategoryModel.findByIdAndDelete(id)
  if (!category) throw new NotFoundExeption('Category not found')
  await client.del('tree_categories')
  await CategoryModel.updateMany(
    {
      parrent: category._id,
    },
    {
      parrent: category.parrent || null,
    }
  )
  res.send(category)
})
