/// <reference types="react-scripts" />

declare namespace ThunkParameter {
  interface Login {
    email: string
    password: string
  }
}

declare namespace Entity {
  type UserRole = 'admin' | 'writter' | 'user'
  interface User {
    email: string
    name: string
    role: UserRole
  }
}

declare namespace APIResponse {
  interface Login {
    access_token: string
    refresh_token: string
    tokenExpiration: string
    refreshTokenExpiration: string
    userId: string
  }

  interface RefreshToken {
    access_token: string
    tokenExpiration: string
    userId: string
  }

  interface Profile extends Entity.User {}
}
