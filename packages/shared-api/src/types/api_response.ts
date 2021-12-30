import { IUser, ObjectWithID, IPost, ICategory } from 'shared-types'

type UserWithoutPassword = Exclude<IUser, 'password'>
export namespace APIResponse {
  export type GetMany<T> = ObjectWithID<T>[]
  export interface Login {
    access_token: string
    refresh_token: string
    tokenExpiration: string
    refreshTokenExpiration: string
    user: ObjectWithID<UserWithoutPassword>
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
  // Data raw trả về
  export type Covid19Raw = Record<'total' | 'today', Record<'internal' | 'world', LocationReport>> &
    Record<'locations', LocationReport[]>
  // Data sau khi xử lý
  export type Covid19 = Record<'internal' | 'world', LocationData> &
    Record<'locations', Array<LocationData & Record<'name', string>>>

  export type GetAllUsers = GetMany<UserWithoutPassword>

  export interface CreateUser extends ObjectWithID<UserWithoutPassword> {}

  export interface UpdateUser extends ObjectWithID<UserWithoutPassword> {}

  export interface DeleteUser extends ObjectWithID<UserWithoutPassword> {}

  export type GetAllPosts = GetMany<
    Pick<
      IPost,
      'title' | 'slug' | 'description' | 'categories' | 'source' | 'thumbnailUrl' | 'publishedAt'
    >
  >

  export interface GetOnePost extends ObjectWithID<IPost> {}

  export interface UpdatePost extends ObjectWithID<IPost> {}

  export interface CreatePost extends ObjectWithID<IPost> {}

  export interface DeletePost extends ObjectWithID<IPost> {}

  export interface CreateCategory extends ObjectWithID<ICategory> {}

  export interface UpdateCategory extends ObjectWithID<ICategory> {}

  export interface DeleteCategory extends ObjectWithID<ICategory> {}

  export type GetAllCategories = GetMany<ICategory>

  interface TreeCategory {
    title: string
    slug: string
    description: string
    subItem: TreeCategory[]
  }
  export type GetTreeCategories = TreeCategory[]
}
