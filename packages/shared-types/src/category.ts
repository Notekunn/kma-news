import type { Model, Document, Types } from 'mongoose'

export interface ICategory {
  title: string
  slug: string
  description?: string
  parrent?: Types.ObjectId
  ancestors: Types.ObjectId[]
}

export interface ICategoryModel extends Model<ICategory> {}

export interface ICategoryDocument extends ICategory, Document {}
