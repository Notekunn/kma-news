import { IPost, IUser, ICategory } from 'shared-types'
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

  export interface CreateCategory {
    title: ICategory['title']
    description?: ICategory['description']
    parrentId?: string | null
  }

  export interface UpdateCategory extends Partial<CreateCategory> {
    _id: string
    slug?: ICategory['slug']
  }

  export interface GetAllCategories extends Pagination {}
  export interface InforPage {
    id: string
    slug: string
  }

  export interface GetAllPosts extends Pagination {}

  export interface UpdatePost extends Partial<IPost> {
    _id: string
  }

  export interface CreatePost extends Partial<IPost> {}

  export interface CreateCategory {
    title: ICategory['title']
    description?: ICategory['description']
    parrentId?: string | null
  }

  export interface UpdateCategory extends Partial<CreateCategory> {
    _id: string
    slug?: ICategory['slug']
  }

  export interface GetAllCategories extends Pagination {}

  export interface GetTreeCategories extends Pagination {}

  export interface CreateOption {
    name: string
    value: string
  }

  export interface UpdateOption {
    name: string
    value: string
  }

  export interface GetPostsOnTopic extends Pagination {
    topicId: string
  }

  export interface GetAllTopic extends Pagination {
    isPublic?: boolean
  }
}
