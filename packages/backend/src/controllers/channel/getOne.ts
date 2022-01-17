import HttpException from '@/exceptions/HttpException'
import NotFoundExeption from '@/exceptions/NotFoundExeption'
import { ChannelModel } from '@/models/channel'
import { errorWrapper } from '@/services/error-wrapper'

const getOneChannel = errorWrapper(async (req, res) => {
  const { id } = req.params
  const channel = await ChannelModel.findById(id)
  if (!channel) throw new NotFoundExeption('Channel not found')
  if (channel.owner.toString() !== req.context?._id?.toString())
    throw new HttpException(403, 'You are not allowed to this channel')
  res.send(channel)
})

export default getOneChannel
