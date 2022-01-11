import mongoose from 'mongoose'
import type { IPublisherDocument } from 'shared-types'

const publisherSchema = new mongoose.Schema<IPublisherDocument>({
  name: {
    type: String,
  },
  hostname: {
    type: String,
    unique: true,
    index: true,
  },
  logo: {
    type: String,
  },
  home: {
    type: String,
  },
})

export const PublisherModel = mongoose.model('publisher', publisherSchema)
