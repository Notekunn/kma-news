import { Model, Document } from 'mongoose'

export type UserRole = 'admin' | 'writter' | 'user'
export interface IUser {
  name: string
  email: string
  password: string
  avatarURL?: string
  role: UserRole
}
// type Request<T, K, U, P> = Request<T, K, U, P>
export interface IUserModel extends Model<IUser> {}
export interface IUserDocument extends IUser, Document {
  hashPassword: () => Promise<void>
  checkPassword: (password: string) => boolean
  validRole: (requiredRole: UserRole) => boolean
}
