/// <reference types="react-scripts" />

declare namespace ThunkParameter {
  interface Login {
    email: string
    password: string
  }
}

declare namespace APIResponse {
  interface Login {
    access_token: string
    refresh_token: string
    tokenExpiration: string
    refreshTokenExpiration: string
  }
}
