import { PostModel } from '@/models/post'
import { errorWrapper } from '@/services/error-wrapper'
import { createValidator } from './validator'

const create = errorWrapper(async (req, res, next) => {
  const { error, value } = createValidator.validate(req.body)
  if (error) throw error
  const { title, description, owner, writter, paragraphs, categories } = value || {}

  const post = new PostModel({ title, description, owner, writter, paragraphs, categories })
  const data = await post.save()
  res.status(201).send(data)
})

export default create
