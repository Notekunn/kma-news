import mongoose from 'mongoose'
import { ITokenDocument } from '@/@types/token'

const tokenSchema = new mongoose.Schema<ITokenDocument>(
  {
    token: {
      type: String,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    type: {
      type: String,
      enum: ['reset', 'refresh'],
      default: 'refresh',
    },
    expiredAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['active', 'disabled'], // Dùng với chức năng đăng xuất
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
)

export const TokenModel = mongoose.model('token', tokenSchema)
