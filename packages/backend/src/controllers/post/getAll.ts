import { IPost } from 'shared-types'
import { PostModel } from '@/models/post'
import { errorWrapper } from '@/services/error-wrapper'
import { queryValidator } from './validator'

const fieldGetAll: Array<keyof IPost | 'url'> = [
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
const getAll = errorWrapper(async (req, res, next) => {
  const { error, value } = queryValidator.validate(req.query)
  if (error) throw error
  const { page, limit, status } = value || {}
  const data = await PostModel.find({
    status: {
      $in: status,
    },
  })

    // .populate('categories', 'title slug')
    .populate('publisher')
    .sort({ publishedAt: -1 })
    .skip(page * limit - limit)
    .limit(limit)
    .select(fieldGetAll)
  res.json(data)
})

export default getAll
