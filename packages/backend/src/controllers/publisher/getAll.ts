import { PublisherModel } from '@/models/publisher'
import { errorWrapper } from '@/services/error-wrapper'

const getAll = errorWrapper(async (req, res) => {
  const publishers = await PublisherModel.find({})
  res.json(publishers)
})
export default getAll
