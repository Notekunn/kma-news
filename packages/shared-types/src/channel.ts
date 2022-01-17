import type { Types, Model, Document } from 'mongoose'

export interface IChannel {
  name: string
  owner: Types.ObjectId
  isPublic: boolean
  categories: Types.ObjectId[]
  keywords: string[]
  publishers: Types.ObjectId[]
  excludedCategories: Types.ObjectId[]
  excludedKeywords: string[]
  excludedPublishers: Types.ObjectId[]
}
export interface IChannelVirtual {
  url: string
}

export interface IChannelModel extends Model<IChannel, {}, {}, IChannelVirtual> {}

export interface IChannelDocument extends IChannel, Document {}
