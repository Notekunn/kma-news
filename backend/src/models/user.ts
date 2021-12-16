import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { IUserDocument } from '../@types'

const userSchema = new mongoose.Schema<IUserDocument>({
  email: {
    type: String,
    unique: true,
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
})

userSchema.pre('save', function (next) {
  this.hashPassword()
  next()
})

userSchema.methods.hashPassword = function () {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(this.password, salt)
  this.password = hash
}

userSchema.methods.checkPassword = function (password: string) {
  console.log('🚀 ~ file: user.ts ~ line 36 ~ password', password)

  return bcrypt.compareSync(password, this.password)
}
export const UserModel = mongoose.model('user', userSchema)
