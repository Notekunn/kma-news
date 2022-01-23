import HttpException from '@/exceptions/HttpException'
import NotFoundExeption from '@/exceptions/NotFoundExeption'
import { ChannelModel } from '@/models/channel'
import { PostModel } from '@/models/post'
import { errorWrapper } from '@/services/error-wrapper'
import { IPostDocument, FilterQuery, IChannel } from 'shared-types'
import { getContentValidator } from './validator'

const fieldGetAll: Array<keyof IPostDocument | 'url'> = [
  'title',
  'slug',
  //   'status',
  'description',
  //   'categories',
  'publisher',
  'thumbnailUrl',
  'url',
  'publishedAt',
]

export const getContent = async (channel: IChannel, page: number, limit: number) => {
  const condition: FilterQuery<IPostDocument>[] = []

  if (channel.publishers.length > 0) {
    condition.push({
      publisher: {
        $in: channel.publishers,
      },
    })
  }

  if (channel.categories.length > 0) {
    condition.push({
      categories: {
        $in: channel.categories,
      },
    })
  }

  if (channel.keywords.length > 0) {
    condition.push({
      keywords: {
        $in: channel.keywords.map((e) => new RegExp(e, 'gi')),
      },
    })
  }

  if (channel.excludedPublishers.length > 0) {
    condition.push({
      publisher: {
        $nin: channel.excludedPublishers,
      },
    })
  }

  if (channel.excludedCategories.length > 0) {
    condition.push({
      categories: {
        $nin: channel.excludedCategories,
      },
    })
  }

  if (channel.excludedKeywords.length > 0) {
    condition.push({
      keywords: {
        $nin: channel.excludedKeywords.map((e) => new RegExp(e, 'gi')),
      },
    })
  }
  const query = condition.length > 0 ? { $and: condition } : {}
  const posts = await PostModel.find({
    ...query,
    status: 'publish',
  })
    .populate('publisher')
    .sort({ publishedAt: -1 })
    .skip(page * limit - limit)
    .limit(limit)
    .select(fieldGetAll)
  return posts
}

const contentByChannel = errorWrapper(async (req, res) => {
  const { id } = req.params
  const { error, value } = getContentValidator.validate(req.query)
  if (error || !value) throw error
  const { page, limit } = value

  const channel = await ChannelModel.findById(id)
  if (!channel) throw new NotFoundExeption('Channel not found')

  const posts = await getContent(channel, page, limit)
  const dataSend = {
    name: channel.name,
    contents: posts,
  }

  res.send(dataSend)
})

export default contentByChannel
