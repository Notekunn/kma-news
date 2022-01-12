import NotFoundExeption from '@/exceptions/NotFoundExeption'
import { PostModel } from '@/models/post'
import { errorWrapper } from '@/services/error-wrapper'
import { IController, IPost } from 'shared-types'

const remove: IController<IPost, 'id'> = errorWrapper(async (req, res, next) => {
  const { id } = req.params
  const data = await PostModel.findByIdAndUpdate(
    id,
    {
      status: 'trash',
    },
    { new: true }
  )
  if (!data) throw new NotFoundExeption('Post not found')
  res.send(data)
})
export default remove
