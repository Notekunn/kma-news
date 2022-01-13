import joi from 'joi'
import { IPublisher } from 'shared-types'

export const createValidator = joi.object<IPublisher>({
  name: joi.string().required(),
  home: joi.string().uri().required(),
  hostname: joi.string().hostname().required(),
  logo: joi.string().uri(),
})

export const updateValidator = joi.object<IPublisher>({
  name: joi.string(),
  home: joi.string().uri(),
  hostname: joi.string().hostname(),
  logo: joi.string().uri(),
})
