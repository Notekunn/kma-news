import mongoose from 'mongoose'
import { ICategoryDocument } from '@/@types'
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
export const CategoryModel = mongoose.model('category', categorySchema)
