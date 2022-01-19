import mongoose from 'mongoose'
import { IChannelDocument } from 'shared-types'

const channelSchema = new mongoose.Schema<IChannelDocument>(
  {
    name: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    isPublic: {
      type: Boolean,
      default: false,
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
      },
    ],
    publishers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'publisher',
      },
    ],
    excludedCategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
      },
    ],
    excludedKeywords: [
      {
        type: String,
      },
    ],
    excludedPublishers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'publisher',
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

channelSchema.virtual('url').get(function (this: IChannelDocument) {
  return `/chu-de/${this._id}`
})
export const ChannelModel = mongoose.model('channel', channelSchema)
