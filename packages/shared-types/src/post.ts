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
  sourceURL: string
  publisher: Types.ObjectId
  description: string
  slug: string
  paragraphs: Array<IParagraph>
  thumbnailUrl: string
  owner?: string
  writter?: Types.ObjectId
  status: IPostStatus
  publishedAt?: Date
  categories: Types.ObjectId[]
  viewCount: number
  keywords: string[]
}
export interface IPostVirtual {
  url: string
}

export interface IPostModel extends Model<IPost, {}, {}, IPostVirtual> {}

export interface IPostDocument extends IPost, Document {
  generateSlug: () => string
}

export interface IParagraphTextModel extends Model<IParagraphText> {}

export interface IParagraphTextDocument extends IParagraphText, Document {}

export interface IParagraphImageModel extends Model<IParagraphImage> {}

export interface IParagraphImageDocument extends IParagraphImage, Document {}
