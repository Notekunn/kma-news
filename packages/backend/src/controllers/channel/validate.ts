import joi from 'joi'
import { IChannel } from 'shared-types'

export const createValidator = joi.object<IChannel>({
  name: joi.string().required(),
  categories: joi.array().items(joi.string()),
  keywords: joi.array().items(joi.string()),
  publishers: joi.array().items(joi.string()),
  excludedCategories: joi.array().items(joi.string()),
  excludedKeywords: joi.array().items(joi.string()),
  excludedPublishers: joi.array().items(joi.string()),
})

export const updateValidator = joi.object<IChannel>({
  name: joi.string(),
  categories: joi.array().items(joi.string()),
  keywords: joi.array().items(joi.string()),
  publishers: joi.array().items(joi.string()),
  excludedCategories: joi.array().items(joi.string()),
  excludedKeywords: joi.array().items(joi.string()),
  excludedPublishers: joi.array().items(joi.string()),
})
