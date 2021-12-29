import mongoose from 'mongoose'
import { ICategoryDocument } from 'shared-types'
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
    },
    children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
      },
    ],
    level: {
      type: Number,
      default: 1,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)
categorySchema.pre('save', function (next) {
  this.slug = stringToSlug(this.title)
  next()
})
export const CategoryModel = mongoose.model('category', categorySchema)
