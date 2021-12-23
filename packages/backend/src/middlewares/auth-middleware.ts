import { UserModel } from '@/models/user'
import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import HttpException from '@/exceptions/HttpException'

const SECRET = process.env.SECRET || 'secret_key_for_jwt'
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization || ''
  const [, token] = authHeader.split(' ')
  if (!authHeader.startsWith('Bearer') || !token)
    return next(new HttpException(403, 'Invalid token'))
  try {
    const { email, id } = jwt.verify(token, SECRET) as JwtPayload
    const user = await UserModel.findOne({
      email,
    })
    if (!user || id != user._id) {
      return next(new HttpException(403, 'Invalid token'))
    }
    req.context = user
    next()
  } catch (error) {
    next(new HttpException(401, 'Unauthorized access'))
  }
}
