import { UserModel } from '@/models/user'
import { Request, Response, NextFunction } from 'express'
import HttpException from '@/exceptions/HttpException'
import client from '@/redis'
import { parseBearerHeader, verifyToken } from '@/services/jwt'

const SECRET = process.env.SECRET || 'secret_key_for_jwt'
const CACHE_TTL = parseInt(process.env.CACHE_TTL || '60')

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = parseBearerHeader(req)
  if (!token) return next(new HttpException(403, 'Invalid token'))
  try {
    const { email, id } = verifyToken(token)
    const cached = await client.get(`user_${id}`)
    // Cache hit
    if (cached) {
      req.context = new UserModel(JSON.parse(cached))
      return next()
    }
    // Cache miss
    const user = await UserModel.findOne({
      email,
    }).select(['_id', 'email', 'name', 'role', 'avatarURL'])

    if (!user || id != user._id) {
      return next(new HttpException(403, 'Invalid token'))
    }
    req.context = user
    // Write aside
    client.set(`user_${id}`, JSON.stringify(user), {
      EX: CACHE_TTL * 60,
    })

    next()
  } catch (error) {
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
  if (!token) return next(new HttpException(403, 'Invalid token'))
  try {
    const { email, id } = verifyToken(token)
    const cached = await client.get(`user_${id}`)
    // Cache hit
    if (cached) {
      req.context = new UserModel(JSON.parse(cached))
      return next()
    }
    // Cache miss
    const user = await UserModel.findOne({
      email,
    }).select(['_id', 'email', 'name', 'role', 'avatarURL'])

    if (!user || id != user._id) {
      return next(new HttpException(403, 'Invalid token'))
    }
    req.context = user
    // Write aside
    client.set(`user_${id}`, JSON.stringify(user), {
      EX: CACHE_TTL * 60,
    })
    next()
  } catch (error) {
    next()
  }
}
