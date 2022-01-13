import { PublisherModel } from '@/models/publisher'
import { errorWrapper } from '@/services/error-wrapper'
import { createValidator } from './validator'

const createPublisher = errorWrapper(async (req, res, next) => {
  const { error, value } = createValidator.validate(req.body)
  if (error || !value) throw error
  const publisher = new PublisherModel(value)
  const data = await publisher.save()
  res.status(201).json(data)
})

export default createPublisher
