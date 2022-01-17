import { ChannelModel } from '@/models/channel'
import { errorWrapper } from '@/services/error-wrapper'
import { createValidator } from './validate'

const createChannel = errorWrapper(async (req, res, next) => {
  const { error, value } = createValidator.validate(req.body)
  if (error || !value) throw error
  const channel = new ChannelModel({
    ...value,
    owner: req.context?._id,
    isPublic: req.context?.validRole('admin'),
  })
  console.log(req.context)

  const data = await channel.save()
  res.send(data)
})

export default createChannel
