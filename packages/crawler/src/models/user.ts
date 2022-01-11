import mongoose from 'mongoose'
import type { IUserDocument, IUserModel } from 'shared-types'

const userSchema = new mongoose.Schema<IUserDocument, IUserModel>(
  {
    email: {
      type: String,
      unique: true,
      index: true,
    },
    password: {
      type: String,
    },
    name: {
      type: String,
      required: false,
      default: 'John',
    },
    avatarURL: {
      type: String,
      required: false,
    },
    role: {
      enum: ['admin', 'writter', 'user'],
      type: String,
      default: 'user',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

export const UserModel = mongoose.model('user', userSchema)
