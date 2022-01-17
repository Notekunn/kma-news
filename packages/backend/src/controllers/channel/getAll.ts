import { ChannelModel } from '@/models/channel'
import { errorWrapper } from '@/services/error-wrapper'

const getAllChannels = errorWrapper(async (req, res, next) => {
  const channels = await ChannelModel.find({
    owner: req.context?._id,
  }).select('-__v -owner')
  res.json(channels)
})

export default getAllChannels
