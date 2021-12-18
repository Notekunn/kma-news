import type { Model, Document } from 'mongoose'
import { Request, Response, NextFunction } from 'express'

declare global {
  namespace Express {
    interface Request {
      context?: IUserDocument
    }
  }
}

export interface IController<BodyType = {}, ResponseType = {}, QueryType = {}, ParamType = {}> {
  (
    req: Request<ParamType, ResponseType, BodyType, QueryType>,
    res: Response<ResponseType>,
    next: NextFunction
  ): void | Promise<void>
}
export interface IControllerAsync<
  BodyType = {},
  ResponseType = {},
  QueryType = {},
  ParamType = {}
> {
  (
    req: Request<ParamType, ResponseType, BodyType, QueryType>,
    res: Response<ResponseType>,
    next: NextFunction
  ): Promise<void>
}

export type UserRole = 'admin' | 'writter' | 'user'
export interface User {
  name: string
  email: string
  password: string
  avatarURL?: string
  role: UserRole
}
// type Request<T, K, U, P> = Request<T, K, U, P>
export interface IUserModel extends Model<User> {}
export interface IUserDocument extends User, Document {
  hashPassword: () => Promise<void>
  checkPassword: (password: string) => boolean
  validRole: (requiredRole: UserRole) => boolean
}

export interface Category {
  title: string
  slug: string
  description?: string
  type: 'nav' | 'single'
  subItems: Array<Category>
}

export interface ICategoryModel extends Model<Category> {}

export interface ICategoryDocument extends Category, Document {}
