import mongoose from 'mongoose'
import { IPostDocument, IParagraph } from 'shared-types'
import { stringToSlug } from '@/services/generate-slug'

const ParagraphSchema = new mongoose.Schema<IParagraph>({
  type: {
    type: String,
    enum: ['text', 'image'],
    default: 'text',
  },
  content: {
    type: String,
  },
  imageUrl: [
    {
      type: String,
      required: true,
    },
  ],
  description: {
    type: String,
  },
})

const postSchema = new mongoose.Schema<IPostDocument>(
  {
    title: {
      type: String,
    },
    slug: {
      type: String,
      unique: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    source: {
      type: String,
    },
    owner: {
      type: String,
    },
    writter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    paragraphs: [ParagraphSchema],
    status: {
      type: String,
      enum: ['publish', 'pending', 'draft', 'trash'], // can be publish, pending, draft, trash
      default: 'draft',
    },
    publishedAt: {
      type: Date,
    },
    categories: [
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
postSchema.pre('save', function (next) {
  this.slug = stringToSlug(this.title)
  this.paragraphs = this.paragraphs.map((e) => {
    if (e.type === 'text') {
      return {
        type: 'text',
        content: e.content,
      }
    }
    return {
      type: 'image',
      description: e.description,
      imageUrl: e.imageUrl,
    }
  })
  next()
})
export const PostModel = mongoose.model('post', postSchema)
