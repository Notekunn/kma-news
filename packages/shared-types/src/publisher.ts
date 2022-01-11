import type { Model, Document } from 'mongoose'

export interface IPublisher {
  name: string
  hostname: string
  logo: string
  home: string
}

export interface IPublisherModel extends Model<IPublisher> {}

export interface IPublisherDocument extends IPublisher, Document {}
