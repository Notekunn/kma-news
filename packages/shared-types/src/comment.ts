import type { Model, Document, Types } from 'mongoose'

export interface IComment {
  post: Types.ObjectId
  author: Types.ObjectId
  message: string
  upVoteCount: number
  downVoteCount: number
  deleted: boolean
}

export interface ICommentModel extends Model<IComment> {}

export interface ICommentDocument extends IComment, Document {}
