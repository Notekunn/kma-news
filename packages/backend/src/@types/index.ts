import { Request, Response, NextFunction } from 'express'
import { IUserDocument } from './user'

declare global {
  namespace Express {
    interface Request {
      context?: IUserDocument
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
