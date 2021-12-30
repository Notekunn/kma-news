import type { Model, Document, Types } from 'mongoose'

export interface IParagraphText {
  type: 'text'
  content: string
}

export interface IParagraphImage {
  type: 'image'
  imageUrl: string[]
  description: string
}

export type IParagraph = IParagraphText | IParagraphImage

export type IPostStatus = 'publish' | 'pending' | 'draft' | 'trash'
export interface IPost {
  title: string
  slug: string
  description: string
  url: string
  paragraphs: Array<IParagraph>
  thumbnailUrl: string
  source?: string
  owner?: string
  writter?: Types.ObjectId
  status: IPostStatus
  publishedAt?: Date
  categories: Types.ObjectId[]
}

export interface IPostModel extends Model<IPost> {}

export interface IPostDocument extends IPost, Document {
  generateSlug: () => string
}

export interface IParagraphTextModel extends Model<IParagraphText> {}

export interface IParagraphTextDocument extends IParagraphText, Document {}

export interface IParagraphImageModel extends Model<IParagraphImage> {}

export interface IParagraphImageDocument extends IParagraphImage, Document {}
