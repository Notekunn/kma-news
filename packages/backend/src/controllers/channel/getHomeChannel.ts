import { ChannelModel } from '@/models/channel'
import { errorWrapper } from '@/services/error-wrapper'
import { getContent } from './contentByChannel'
import { getHomeContentValidator } from './validator'

const getHomeChannels = errorWrapper(async (req, res, next) => {
  const { error, value } = getHomeContentValidator.validate(req.query)
  if (error || !value) throw error

  const channels = await ChannelModel.find({
    isPublic: true,
  }).select('-__v -owner')

  const data = []
  for (const channel of channels) {
    const posts = await getContent(channel, value.page, value.limit)
    data.push({
      name: channel.name,
      contents: posts,
    })
  }
  res.json(data)
})

export default getHomeChannels
