import { IUser, ObjectWithID } from 'shared-types'

export namespace APIResponse {
  export interface Login {
    access_token: string
    refresh_token: string
    tokenExpiration: string
    refreshTokenExpiration: string
    userId: string
  }

  export interface RefreshToken {
    access_token: string
    tokenExpiration: string
    userId: string
  }

  export interface Logout {
    message: string
  }

  export interface Profile extends ObjectWithID<IUser> {}

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

  export type GetAllUsers = ObjectWithID<IUser>[]

  export interface CreateUser extends ObjectWithID<IUser> {}

  export interface UpdateUser extends ObjectWithID<IUser> {}

  export interface DeleteUser extends ObjectWithID<IUser> {}
}
