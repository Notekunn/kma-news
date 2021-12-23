import { UserModel } from '@/models/user'
import { Request, Response, NextFunction } from 'express'
import HttpException from '@/exceptions/HttpException'
import { UserRole } from 'shared-types'

/**
 * Middleware dùng để bảo vệ các endpoint của api
 */
export const guardMiddleware = (requiredRole: UserRole) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.context || !req.context.validRole(requiredRole))
      next(new HttpException(403, 'Unauthorized access'))
    next()
  }
}
