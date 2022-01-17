import joi from 'joi'
import { IOption } from 'shared-types'

export const createValidator = joi.object<IOption>({
  name: joi.string().pattern(new RegExp('^[a-z0-9]+(?:-[a-z0-9]+)*')).required(),
  value: joi.string().required(),
})

export const updateValidator = joi.object<IOption>({
  value: joi.string(),
})
