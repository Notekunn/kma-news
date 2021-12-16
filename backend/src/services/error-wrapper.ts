import { IController, IControllerAsync } from '../@types'
import HttpException from '../exceptions/HttpException'

export const errorWrapper = <T, K, U, P>(
  callback: IControllerAsync<T, K, U, P>
): IController<T, K, U, P> => {
  return (req, res, next) => {
    callback(req, res, next).catch((err: Error) => {
      next(new HttpException(500, err.message))
    })
  }
}
