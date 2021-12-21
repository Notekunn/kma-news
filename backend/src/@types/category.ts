import { Model, Document } from 'mongoose'

export interface ICategory {
  title: string
  slug: string
  description?: string
  type: 'nav' | 'single'
  subItems: Array<ICategory>
}

export interface ICategoryModel extends Model<ICategory> {}

export interface ICategoryDocument extends ICategory, Document {}
