import { loginWithEmail, getProfile, Types, logout } from 'shared-api'
import { RootState } from '@/app/store'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { LoadingState } from 'shared-types'

export const login = createAsyncThunk(
  'auth/login',
  async (_: Types.APIParameter.Login, thunkAPI) => {
    const result = await loginWithEmail(_)
    return result
  }
)
export const profile = createAsyncThunk('auth/profile', async (_, thunkAPI) => {
  const data = await getProfile()
  return data
})

export const logoutAction = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  const refresh_token = localStorage.getItem('refresh_token')
  if (!refresh_token) return null
  const data = await logout(refresh_token)
  return data
})

export interface AuthState {
  loading: LoadingState
  loggedIn: boolean
  profile?: Types.APIResponse.Profile
  message?: string
}
const initialState: AuthState = {
  loading: 'idle',
  loggedIn: !!localStorage.getItem('access_token'),
}
const authSlice = createSlice({
  name: 'auth',
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = 'done'
        state.loggedIn = true
        const { access_token, refresh_token } = action.payload
        localStorage.setItem('access_token', access_token)
        localStorage.setItem('refresh_token', refresh_token)
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = 'error'
        state.message = action.error.message
      })
      .addCase(profile.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.loading = 'done'
        state.profile = action.payload
      })
      .addCase(profile.rejected, (state, action) => {
        state.loading = 'error'
        state.message = action.error.message
      })
      .addCase(logoutAction.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(logoutAction.fulfilled, (state, action) => {
        state.loading = 'done'
        state.message = 'Logout success'
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
      })
      .addCase(logoutAction.rejected, (state, action) => {
        state.loading = 'error'
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
      })
  },
})

export const selectLoading = (state: RootState) => state.auth.loading
export const selectLoggedIn = (state: RootState) => state.auth.loggedIn
export const selectProfile = (state: RootState) => state.auth.profile
export const selectMessage = (state: RootState) => state.auth.message

export default authSlice.reducer
