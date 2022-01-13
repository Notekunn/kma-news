import NotFoundExeption from '@/exceptions/NotFoundExeption'
import { errorWrapper } from '@/services/error-wrapper'
import { PublisherModel } from '@/models/publisher'
import { updateValidator } from './validator'

const updatePublisher = errorWrapper(async (req, res, next) => {
  const { id } = req.params
  const { error, value } = updateValidator.validate(req.body)
  if (error || !value) throw error
  const publisher = await PublisherModel.findByIdAndUpdate(id, value, { new: true, upsert: true })
  if (!publisher) throw new NotFoundExeption('Publisher not found')
  res.json(publisher)
})

export default updatePublisher
