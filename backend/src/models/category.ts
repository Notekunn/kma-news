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
  type: {
    type: String,
    enum: ['nav', 'single'],
    default: 'single',
  },
  subItems: [
    {
      ref: 'category',
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
})
categorySchema.pre('save', function (next) {
  this.slug = stringToSlug(this.title)
  if (!this.subItems || this.type == 'single') this.subItems = []
  next()
})
export const CategoryModel = mongoose.model('category', categorySchema)
