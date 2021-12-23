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
    },
    ancestors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
)
categorySchema.pre('save', function (next) {
  this.slug = BaseService.stringToSlug(this.title)
  next()
})
export const CategoryModel = mongoose.model('category', categorySchema)
