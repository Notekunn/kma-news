import type { Request, Response, NextFunction } from 'express'
import { Types } from 'mongoose'
import type { IUserDocument } from './user'

declare global {
  namespace Express {
    interface Request {
      context?: IUserDocument
      cookies: {
        [key: string]: string
      }
    }
  }
}

export interface IController<
  BodyType = {},
  ParamType extends string = any,
  QueryType extends string = any,
  ResponseType = {}
> {
  (
    req: Request<Record<ParamType, string>, ResponseType, BodyType, Record<QueryType, string>>,
    res: Response<ResponseType>,
    next: NextFunction
  ): void | Promise<void>
}
export interface IControllerAsync<
  BodyType = {},
  ParamType extends string = any,
  QueryType extends string = any,
  ResponseType = {}
> {
  (
    req: Request<Record<ParamType, string>, ResponseType, BodyType, Record<QueryType, string>>,
    res: Response<ResponseType>,
    next: NextFunction
  ): Promise<void>
}

export * from './user'
export * from './token'
export * from './category'
export * from './post'
export * from './comment'
export * from './channel'
export * from './publisher'
export * from './option'

export type ObjectWithID<T extends Object = {}> = {
  _id: string
} & T

export type LoadingState = 'idle' | 'pending' | 'done' | 'error'

export type ModalState = 'edit' | 'add' | 'none'

export const ObjectId = Types.ObjectId

export type MongoObjectId = Types.ObjectId
