import { IUser, ObjectWithID, IPost, ICategory, IPublisher, IOption, IChannel } from 'shared-types'

declare type UserWithoutPassword = Exclude<IUser, 'password'>

export type PostWithPublisher = Omit<IPost, 'publisher'> & {
  url: string
  publisher: IPublisher
}
export declare namespace APIResponse {
  export type GetMany<T> = ObjectWithID<T>[]
  export interface Login {
    access_token: string
    tokenExpiration: string
    user: ObjectWithID<UserWithoutPassword>
  }
  interface paragraph {
    type: 'text' | 'image'
    content?: string
    description?: string
  }
  export interface InforRenderPage {
    title: string
    slug: string
    category: string
    description: string
    source: string
    owner: string
    publishAt: Date
    [paragraphs: number]: paragraph
  }
  export interface RefreshToken {
    access_token: string
    tokenExpiration: string
    user: ObjectWithID<UserWithoutPassword>
  }
  export interface Logout {
    message: string
  }
  export interface Profile extends ObjectWithID<UserWithoutPassword> {}
  interface LocationReport {
    name: string
    death: number
    treating: number
    recovered: number
    cases: number
    casesToday: number
  }
  type LocationField =
    | 'cases'
    | 'death'
    | 'treating'
    | 'recovered'
    | 'casesToday'
    | 'deathToday'
    | 'recoveredToday'
    | 'treatingToday'
  type LocationData = Record<LocationField, number>
  export type Covid19Raw = Record<'total' | 'today', Record<'internal' | 'world', LocationReport>> &
    Record<'locations', LocationReport[]>
  export type Covid19 = Record<'internal' | 'world', LocationData> &
    Record<'locations', Array<LocationData & Record<'name', string>>>
  export type GetAllUsers = GetMany<UserWithoutPassword>
  export interface CreateUser extends ObjectWithID<UserWithoutPassword> {}
  export interface UpdateUser extends ObjectWithID<UserWithoutPassword> {}
  export interface DeleteUser extends ObjectWithID<UserWithoutPassword> {}
  export type GetAllPosts = GetMany<PostWithPublisher>
  export type GetOnePost = ObjectWithID<PostWithPublisher>
  export interface UpdatePost extends ObjectWithID<IPost> {
    url: string
  }
  export interface CreatePost extends ObjectWithID<IPost> {
    url: string
  }
  export interface DeletePost extends ObjectWithID<IPost> {
    url: string
  }
  export interface CreateCategory extends ObjectWithID<ICategory> {}

  export interface UpdateCategory extends ObjectWithID<ICategory> {}

  export interface DeleteCategory extends ObjectWithID<ICategory> {}

  export type GetAllCategories = GetMany<ICategory>

  interface TreeCategory {
    title: string
    slug: string
    description: string
    subItems: TreeCategory[]
  }
  export type GetTreeCategories = TreeCategory[]

  export interface CreateOption extends ObjectWithID<IOption> {}

  export interface UpdateOption extends ObjectWithID<IOption> {}

  export interface GetOptionByName extends ObjectWithID<IOption> {}

  export interface GetPostsOnTopic {
    name: string
    contents: GetMany<PostWithPublisher>
  }

  export type GetHomeTopics = GetPostsOnTopic[]
}
