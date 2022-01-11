import mongoose from 'mongoose'
import type { IPostDocument, IParagraph, IPostModel } from 'shared-types'
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

const postSchema = new mongoose.Schema<IPostDocument, IPostModel>(
  {
    title: {
      type: String,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    publisher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'publisher',
    },
    sourceURL: {
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
    keywords: [
      {
        type: String,
        index: 'text',
      },
    ],
    viewCount: {
      type: Number,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)
postSchema.pre<IPostDocument>('save', function (next) {
  this.slug = this.generateSlug()
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

postSchema.methods.generateSlug = function () {
  let slug = stringToSlug(this.title)
  if (this.publishedAt) {
    slug += '-'
    slug += new Date(this.publishedAt).getTime().toString().slice(0, -3)
  }
  return slug
}

postSchema.virtual('url').get(function (this: IPostDocument) {
  return `/bai-bao/${this.slug}`
})

export const PostModel = mongoose.model('post', postSchema)
