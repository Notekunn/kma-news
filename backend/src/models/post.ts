import mongoose from 'mongoose'
import { IPostDocument, IParagraph } from '@/@types/post'
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
