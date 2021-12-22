import joi from 'joi'
import { IController } from '@/@types'
import { IPost, IParagraphText, IParagraphImage } from '@/@types/post'
import { PostModel } from '@/models/post'
import { errorWrapper } from '@/services/error-wrapper'
import NotFoundExeption from '@/exceptions/NotFoundExeption'

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
  source: joi.string(),
  owner: joi.string(),
  writter: joi.string(),
  paragraphs: joi.array().items(textParagraph, imageParagraph).required(),
})

export const create: IController<IPost> = errorWrapper(async (req, res, next) => {
  const { error, value } = createValidator.validate(req.body)
  if (error) throw error
  const { title, description, source, owner, writter, paragraphs } = value || {}
  const post = new PostModel({ title, description, source, owner, writter, paragraphs })
  const data = await post.save()
  res.status(201).send(data)
})

const updateValidator = joi.object<IPost>({
  title: joi.string(),
  description: joi.string(),
  source: joi.string(),
  owner: joi.string(),
  writter: joi.string(),
  paragraphs: joi.array().items(textParagraph, imageParagraph),
  publishedAt: joi.date(),
  slug: joi.string(),
  status: joi.string().valid('publish', 'pending', 'draft', 'trash'),
})

export const update: IController<IPost, 'id'> = errorWrapper(async (req, res, next) => {
  //   const user = req.context
  const { id } = req.params
  const { value, error } = updateValidator.validate(req.body)
  if (error) throw error

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
