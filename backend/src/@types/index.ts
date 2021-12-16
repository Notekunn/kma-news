import type { Model, Document } from 'mongoose'
import { Request, Response, NextFunction } from 'express'
export interface User {
  name: string
  email: string
  password: string
  avatarURL?: string
}

export interface IUserModel extends Model<User> {}
export interface IUserDocument extends User, Document {
  hashPassword: () => Promise<void>
  checkPassword: (password: string) => boolean
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
