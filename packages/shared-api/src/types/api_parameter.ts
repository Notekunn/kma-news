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
}
