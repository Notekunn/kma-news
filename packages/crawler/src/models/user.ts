import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import type { IUserDocument, IUserModel, UserRole } from 'shared-types'

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

userSchema.pre<IUserDocument>('save', function (next) {
  this.hashPassword()
  next()
})

userSchema.methods.hashPassword = function () {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(this.password, salt)
  this.password = hash
}

userSchema.methods.checkPassword = function (password: string) {
  return bcrypt.compareSync(password, this.password)
}

userSchema.methods.validRole = function (requiredRole: UserRole) {
  if (this.role === requiredRole) return true
  if (this.role === 'admin') return true
  if (this.role === 'writter' && requiredRole === 'user') return true
  return false
}
export const UserModel = mongoose.model('user', userSchema)
