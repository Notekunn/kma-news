import { UserModel } from '@/models/user'
import { Request, Response, NextFunction } from 'express'
import HttpException from '@/exceptions/HttpException'
import { parseBearerHeader, verifyToken } from '@/services/jwt'
import { getUserFromCache, setUserToCache } from '@/services/cache'

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = parseBearerHeader(req)
  if (!token) return next(new HttpException(403, 'Invalid token'))
  try {
    const { email, _id } = verifyToken(token)
    const cachedUser = await getUserFromCache(_id)
    // Cache hit
    if (cachedUser) {
      req.context = cachedUser
      return next()
    }
    // Cache miss
    const user = await UserModel.findOne({
      email,
    }).select(['_id', 'email', 'name', 'role', 'avatarURL'])

    if (!user || _id != user._id) {
      return next(new HttpException(403, 'Invalid token'))
    }
    req.context = user
    // Write aside
    await setUserToCache(user)

    next()
  } catch (error: any) {
    if (error instanceof HttpException) return next(error)
    next(new HttpException(401, 'Unauthorized access'))
  }
}
/**
 * Middleware kiểm tra user nếu có
 * @param req request
 * @param res response
 * @param next next param
 * @returns
 */
export const nonAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = parseBearerHeader(req)
  if (!token) return next()
  try {
    const { email, _id } = verifyToken(token)
    const cachedUser = await getUserFromCache(_id)
    // Cache hit
    if (cachedUser) {
      req.context = cachedUser
      return next()
    }
    // Cache miss
    const user = await UserModel.findOne({
      email,
    }).select(['_id', 'email', 'name', 'role', 'avatarURL'])

    if (!user || _id != user._id) {
      return next(new HttpException(403, 'Invalid token'))
    }
    req.context = user
    // Write aside
    await setUserToCache(user)
    next()
  } catch (error) {
    next()
  }
}
