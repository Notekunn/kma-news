import { IController, IControllerAsync } from '../@types'
import HttpException from '../exceptions/HttpException'

/**
 * Hàm xử lý lỗi trong async middleware
 * @param callback Async middleware function
 * @param errorHandler Error handler function
 * @returns middleware function
 */
export const errorWrapper = <T, K extends string, U extends string, P>(
  callback: IControllerAsync<T, K, U, P>,
  errorHandler?: (error: Error) => HttpException
): IController<T, K, U, P> => {
  return (req, res, next) => {
    callback(req, res, next).catch((err: HttpException | Error) => {
      if (errorHandler) {
        next(errorHandler(err))
      } else {
        next(new HttpException(500, err.message))
      }
    })
  }
}
