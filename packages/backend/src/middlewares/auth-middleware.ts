import { UserModel } from '@/models/user'
import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import HttpException from '@/exceptions/HttpException'
import client from '@/redis'

const SECRET = process.env.SECRET || 'secret_key_for_jwt'
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization || ''
  const [, token] = authHeader.split(' ')
  if (!authHeader.startsWith('Bearer') || !token)
    return next(new HttpException(403, 'Invalid token'))
  try {
    const { email, id } = jwt.verify(token, SECRET) as JwtPayload
    const cached = await client.get(`user_${id}`)
    if (cached) {
      req.context = JSON.parse(cached)
      return next()
    }
    const user = await UserModel.findOne({
      email,
    }).select(['_id', 'email', 'name', 'role', 'avatarURL'])
    if (!user || id != user._id) {
      return next(new HttpException(403, 'Invalid token'))
    }
    req.context = user
    next()
  } catch (error) {
    next(new HttpException(401, 'Unauthorized access'))
  }
}
