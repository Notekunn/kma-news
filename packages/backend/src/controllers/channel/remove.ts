import HttpException from '@/exceptions/HttpException'
import NotFoundExeption from '@/exceptions/NotFoundExeption'
import { ChannelModel } from '@/models/channel'
import { errorWrapper } from '@/services/error-wrapper'

const deleteChannel = errorWrapper(async (req, res, next) => {
  const user = req.context
  const { id } = req.params
  const channel = await ChannelModel.findById(id)
  if (!channel) throw new NotFoundExeption('Channel not found')
  if (channel.owner.toString() !== user?._id?.toString())
    throw new HttpException(403, 'You are not allowed to delete this channel')
  const data = await ChannelModel.findByIdAndDelete(id)
  res.send(data)
})

export default deleteChannel
