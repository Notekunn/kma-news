import type { Types, Model, Document } from 'mongoose'

export interface IChannel {
  name: string
  owner: Types.ObjectId
  categories: Types.ObjectId[]
  keywords: Types.ObjectId[]
  publishers: Types.ObjectId[]
  excludedCategories: Types.ObjectId[]
  excludedKeywords: Types.ObjectId[]
  excludedPublishers: Types.ObjectId[]
}

export interface IChannelModel extends Model<IChannel> {}

export interface IChannelDocument extends IChannel, Document {}
