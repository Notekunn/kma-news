import mongoose from 'mongoose'
import { ICategoryDocument } from '@/@types'
import { stringToSlug } from '@/services/generate-slug'
const categorySchema = new mongoose.Schema<ICategoryDocument>({
  title: {
    type: String,
  },
  slug: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
  },
})
categorySchema.pre('save', function (next) {
  this.slug = stringToSlug(this.title)
  next()
})
export const CategoryModel = mongoose.model('category', categorySchema)
