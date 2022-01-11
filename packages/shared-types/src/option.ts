import type { Model, Document } from 'mongoose'

export interface IOption {
  name: string
  value: string
}

export interface IOptionModel extends Model<IOption> {}

export interface IOptionDocument extends IOption, Document {}
