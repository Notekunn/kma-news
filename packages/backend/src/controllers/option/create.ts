import { OptionModel } from '@/models/option'
import { errorWrapper } from '@/services/error-wrapper'
import { createValidator } from './validator'

const createOption = errorWrapper(async (req, res, next) => {
  const { error, value } = createValidator.validate(req.body)
  if (error || !value) throw error
  const option = new OptionModel(value)
  const data = await option.save()
  res.send(data)
})

export default createOption
