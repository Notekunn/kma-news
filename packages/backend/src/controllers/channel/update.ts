import HttpException from '@/exceptions/HttpException'
import NotFoundExeption from '@/exceptions/NotFoundExeption'
import { ChannelModel } from '@/models/channel'
import { errorWrapper } from '@/services/error-wrapper'
import { updateValidator } from './validator'

const updateChannel = errorWrapper(async (req, res, next) => {
  const user = req.context
  const { id } = req.params
  const channel = await ChannelModel.findById(id)
  if (!channel) throw new NotFoundExeption('Channel not found')
  if (channel.owner.toString() !== user?._id?.toString())
    throw new HttpException(403, 'You are not allowed to update this channel')
  const { error, value } = updateValidator.validate(req.body)
  if (error || !value) throw error
  const data = await ChannelModel.findByIdAndUpdate(id, value, { new: true })
  res.send(data)
})

export default updateChannel
