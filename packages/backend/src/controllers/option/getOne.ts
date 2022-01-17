import NotFoundExeption from '@/exceptions/NotFoundExeption'
import { OptionModel } from '@/models/option'
import { errorWrapper } from '@/services/error-wrapper'

const getOneOption = errorWrapper(async (req, res, next) => {
  const { name } = req.params
  const option = await OptionModel.findOne({ name })
  if (!option) throw new NotFoundExeption('Option not found')
  res.send(option)
})
export default getOneOption
