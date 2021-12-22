/// <reference types="react-scripts" />

declare namespace ThunkParameter {
  interface Login {
    email: string
    password: string
  }
}

declare namespace Entity {
  interface User {
    email: string
    name: string
    role: 'admin' | 'writer' | 'user'
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
