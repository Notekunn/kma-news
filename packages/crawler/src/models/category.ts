import mongoose from 'mongoose'
import { ICategoryDocument } from 'shared-types'
import BaseService from '../services/base'
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
  this.slug = BaseService.stringToSlug(this.title)
  next()
})
export const CategoryModel = mongoose.model('category', categorySchema)
