import joi from 'joi'
import { IPost, IParagraphText, IParagraphImage } from 'shared-types'

const textParagraph = joi.object<IParagraphText>({
  type: joi.string().valid('text').required(),
  content: joi.string().required(),
})

const imageParagraph = joi.object<IParagraphImage>({
  type: joi.string().valid('image').required(),
  description: joi.string().required(),
  imageUrl: joi.array().items(joi.string()).min(1).required(),
})
export const queryValidator = joi.object({
  page: joi.number().integer().min(1).default(1),
  limit: joi.number().integer().min(1).default(10),
  status: joi
    .array()
    .items(joi.string().valid('publish', 'pending', 'draft', 'trash').required())
    .single()
    .default(['publish']),
})

export const createValidator = joi.object<IPost>({
  title: joi.string().required(),
  description: joi.string().required(),
  thumbnailUrl: joi.string().uri().required(),
  owner: joi.string().default('Tổng hợp'),
  writter: joi.string(),
  categories: joi.array().items(joi.string()).default([]),
  paragraphs: joi.array().items(textParagraph, imageParagraph).required(),
  keywords: joi.array().items(joi.string()).default([]),
  sourceURL: joi.string().uri().allow(''),
  publisher: joi.string().required(),
})

export const updateValidator = joi.object<IPost>({
  title: joi.string(),
  description: joi.string(),
  thumbnailUrl: joi.string().uri(),
  owner: joi.string(),
  writter: joi.string(),
  paragraphs: joi.array().items(textParagraph, imageParagraph),
  publishedAt: joi.date(),
  slug: joi.string(),
  status: joi.string().valid('publish', 'pending', 'draft', 'trash'),
  categories: joi.array().items(joi.string()),
  sourceURL: joi.string().uri().allow(''),
  publisher: joi.string(),
})
