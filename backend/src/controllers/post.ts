import Joi from 'joi'
import { IController } from '@/@types'
import { IPost, IParagraphText, IParagraphImage } from '@/@types/post'
import { PostModel } from '@/models/post'
import { errorWrapper } from '@/services/error-wrapper'

export const getAll: IController = errorWrapper(async (req, res, next) => {
  const data = await PostModel.find({})
  res.json(data)
})
const textParagraph = Joi.object<IParagraphText>({
  type: Joi.string().valid('text').required(),
  content: Joi.string().required(),
})
const imageParagraph = Joi.object<IParagraphImage>({
  type: Joi.string().valid('image').required(),
  description: Joi.string().required(),
  imageUrl: Joi.array().items(Joi.string()).min(1).required(),
})
const createValidator = Joi.object<IPost>({
  title: Joi.string().required(),
  description: Joi.string().required(),
  source: Joi.string(),
  owner: Joi.string(),
  writter: Joi.string(),
  paragraphs: Joi.array().items(textParagraph, imageParagraph).required(),
})
export const create: IController<IPost> = errorWrapper(async (req, res, next) => {
  const { error, value } = createValidator.validate(req.body)
  if (error) throw error
  const { title, description, source, owner, writter, paragraphs } = value || {}
  const post = new PostModel({ title, description, source, owner, writter, paragraphs })
  const data = await post.save()
  res.status(201).send(data)
})
