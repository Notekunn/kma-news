import NotFoundExeption from '@/exceptions/NotFoundExeption'
import { PostModel } from '@/models/post'
import { errorWrapper } from '@/services/error-wrapper'
import { IController, IPost } from 'shared-types'

const getBySlug: IController<IPost, 'slug'> = errorWrapper(async (req, res, next) => {
  const { slug } = req.params
  const data = await PostModel.findOne({ slug })
  if (!data) throw new NotFoundExeption('Post not found')
  res.send(data)
})

export default getBySlug
