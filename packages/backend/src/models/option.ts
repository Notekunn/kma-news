import mongoose from 'mongoose'
import { IOptionDocument } from 'shared-types'

const optionSchema = new mongoose.Schema<IOptionDocument>({
  name: {
    type: String,
    unique: true,
    index: true,
  },
  value: {
    type: String,
  },
})

export const OptionModel = mongoose.model('option', optionSchema)
