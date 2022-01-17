import NotFoundExeption from '@/exceptions/NotFoundExeption'
import { OptionModel } from '@/models/option'
import { errorWrapper } from '@/services/error-wrapper'
import { updateValidator } from './validator'

const updateOption = errorWrapper(async (req, res, next) => {
  const { name } = req.params
  const { error, value } = updateValidator.validate(req.body)
  if (error) throw error
  const option = await OptionModel.findOneAndUpdate({ name }, value, { new: true })
  if (!option) throw new NotFoundExeption('Option not found')
  res.send(option)
})

export default updateOption
