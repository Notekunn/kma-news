import HttpException from '@/exceptions/HttpException'
import type { Request } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

const SECRET = process.env.SECRET || 'secret_key_for_jwt'
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'secret_key_for_refresh'
const ACCESS_TOKEN_TTL = parseInt(process.env.ACCESS_TOKEN_TTL || '' + 30 * 60)
const REFRESH_TOKEN_TTL = parseInt(process.env.REFRESH_TOKEN_TTL || '' + 7 * 24 * 60 * 60)

export interface ITokenPayload extends JwtPayload {
  email: string
  id: string
}

export const parseBearerHeader = (req: Request) => {
  const authHeader = req.headers.authorization || ''
  const [, token] = authHeader.split(' ')
  if (!authHeader.startsWith('Bearer') || !token) return null
  return token.trim()
}

export const verifyToken = (token: string): ITokenPayload => {
  const { email, id } = jwt.verify(token, SECRET) as JwtPayload
  return { email, id }
}

export const verifyRefreshToken = (token: string): ITokenPayload => {
  const { email, id, tokenType } = jwt.verify(token, REFRESH_SECRET) as JwtPayload
  if (tokenType !== 'refresh') throw new HttpException(400, 'Invalid token type')
  return { email, id } as const
}

export const signToken = (email: string, id: string) => {
  return jwt.sign({ email, id }, SECRET, { expiresIn: ACCESS_TOKEN_TTL })
}

export const signRefreshToken = (email: string, id: string) => {
  return jwt.sign(
    {
      email,
      id,
      tokenType: 'refresh',
    },
    SECRET,
    { expiresIn: REFRESH_TOKEN_TTL }
  )
}
