import mongoose from 'mongoose'
import { IPostDocument, IParagraph } from '@/@types/post'

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

const PostSchema = new mongoose.Schema<IPostDocument>(
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
export const PostModel = mongoose.model('post', PostSchema)
