import joi from 'joi'
import { IController } from '@/@types'
import { IPost, IParagraphText, IParagraphImage } from '@/@types/post'
import { PostModel } from '@/models/post'
import { errorWrapper } from '@/services/error-wrapper'
import NotFoundExeption from '@/exceptions/NotFoundExeption'
import moment from 'moment-timezone'

const TIMEZONE = process.env.TIMEZONE || 'Asia/Ho_Chi_Minh'

const queryValidator = joi.object({
  page: joi.number().integer().min(1).default(1),
  limit: joi.number().integer().min(1).default(10),
  status: joi
    .array()
    .items(joi.string().valid('publish', 'pending', 'draft', 'trash').required())
    .single()
    .default(['publish']),
})

export const getAll: IController = errorWrapper(async (req, res, next) => {
  const { error, value } = queryValidator.validate(req.query)
  if (error) throw error
  const { page, limit, status } = value || {}
  const data = await PostModel.find({
    status: {
      $in: status,
    },
  })
    .skip(page * limit - limit)
    .limit(limit)
    .populate('categories', ['title', 'slug'])
    .sort({ publishedAt: -1 })
  res.json(data)
})

const textParagraph = joi.object<IParagraphText>({
  type: joi.string().valid('text').required(),
  content: joi.string().required(),
})

const imageParagraph = joi.object<IParagraphImage>({
  type: joi.string().valid('image').required(),
  description: joi.string().required(),
  imageUrl: joi.array().items(joi.string()).min(1).required(),
})

const createValidator = joi.object<IPost>({
  title: joi.string().required(),
  description: joi.string().required(),
  thumbnailUrl: joi.string().uri().required(),
  source: joi.string(),
  owner: joi.string().default('Tổng hợp'),
  writter: joi.string(),
  categories: joi.array().items(joi.string()).default([]),
  paragraphs: joi.array().items(textParagraph, imageParagraph).required(),
})

export const create: IController<IPost> = errorWrapper(async (req, res, next) => {
  const { error, value } = createValidator.validate(req.body)
  if (error) throw error
  const { title, description, source, owner, writter, paragraphs, categories } = value || {}

  const post = new PostModel({ title, description, source, owner, writter, paragraphs, categories })
  const data = await post.save()
  res.status(201).send(data)
})

const updateValidator = joi.object<IPost>({
  title: joi.string(),
  description: joi.string(),
  thumbnailUrl: joi.string().uri(),
  source: joi.string(),
  owner: joi.string(),
  writter: joi.string(),
  paragraphs: joi.array().items(textParagraph, imageParagraph),
  publishedAt: joi.date(),
  slug: joi.string(),
  status: joi.string().valid('publish', 'pending', 'draft', 'trash'),
  categories: joi.array().items(joi.string()),
})

export const update: IController<IPost, 'id'> = errorWrapper(async (req, res, next) => {
  //   const user = req.context
  const { id } = req.params
  const { value, error } = updateValidator.validate(req.body)
  if (error) throw error
  // Nếu publish thì cập nhật lại publishedAt
  if (value?.status === 'publish') {
    value.publishedAt = value.publishedAt || moment.tz(TIMEZONE).toDate()
  }

  // Có thể thêm chức năng duyệt bài chỉ cho admin đổi status thành publish
  const data = await PostModel.findByIdAndUpdate(id, value, { new: true })
  if (!data) throw new NotFoundExeption('Post not found')
  res.send(data)
})

export const getOne: IController<IPost, 'id'> = errorWrapper(async (req, res, next) => {
  const { id } = req.params
  const data = await PostModel.findById(id)
  if (!data) throw new NotFoundExeption('Post not found')
  res.send(data)
})

export const getBySlug: IController<IPost, 'slug'> = errorWrapper(async (req, res, next) => {
  const { slug } = req.params
  const data = await PostModel.findOne({ slug })
  if (!data) throw new NotFoundExeption('Post not found')
  res.send(data)
})

export const remove: IController<IPost, 'id'> = errorWrapper(async (req, res, next) => {
  const { id } = req.params
  const data = await PostModel.findByIdAndUpdate(
    id,
    {
      status: 'trash',
    },
    { new: true }
  )
  if (!data) throw new NotFoundExeption('Post not found')
  res.send(data)
})
