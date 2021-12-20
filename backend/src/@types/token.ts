import type { Types, Model, Document } from 'mongoose'

export interface IToken {
  token: string
  user: Types.ObjectId
  type: 'reset' | 'refresh'
  status: 'active' | 'disabled'
  expiredAt: Date
}

export interface ITokenModel extends Model<IToken> {}

export interface ITokenDocument extends IToken, Document {}
