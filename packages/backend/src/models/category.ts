import mongoose from 'mongoose'
import type { ICategoryDocument } from 'shared-types'
import { stringToSlug } from '@/services/generate-slug'
const categorySchema = new mongoose.Schema<ICategoryDocument>(
  {
    title: {
      type: String,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    description: {
      type: String,
    },
    parrent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category',
      default: null,
      index: true,
    },
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)
categorySchema.pre<ICategoryDocument>('save', function (next) {
  this.slug = stringToSlug(this.title)
  next()
})
export const CategoryModel = mongoose.model('category', categorySchema)
