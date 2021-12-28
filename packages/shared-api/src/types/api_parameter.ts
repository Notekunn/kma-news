import { IPost, IUser } from 'shared-types'
export namespace APIParameter {
  export interface Login {
    email: string
    password: string
  }
  export interface Profile {}

  export interface Pagination {
    page?: number
    limit?: number
  }

  export interface UpdateUser extends Partial<IUser> {
    _id: string
  }

  export interface CreateUser extends Partial<Exclude<IUser, 'avatarURL'>> {}

  export interface GetAllPosts extends Pagination {}

  export interface UpdatePost extends Partial<IPost> {
    _id: string
  }

  export interface CreatePost extends Partial<IPost> {}
}
