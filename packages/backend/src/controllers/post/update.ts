import NotFoundExeption from '@/exceptions/NotFoundExeption'
import { errorWrapper } from '@/services/error-wrapper'
import { IController, IPost } from 'shared-types'
import { updateValidator } from './validator'
import { PostModel } from '@/models/post'

const update: IController<IPost, 'id'> = errorWrapper(async (req, res, next) => {
  //   const user = req.context
  const { id } = req.params
  const { value, error } = updateValidator.validate(req.body)
  if (error) throw error
  // Nếu publish thì cập nhật lại publishedAt
  if (value?.status === 'publish') {
    value.publishedAt = value.publishedAt || new Date()
  }

  // Có thể thêm chức năng duyệt bài chỉ cho admin đổi status thành publish
  const data = await PostModel.findByIdAndUpdate(id, value, { new: true })
  if (!data) throw new NotFoundExeption('Post not found')
  res.send(data)
})

export default update
