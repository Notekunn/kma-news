import { loginWithEmail, getProfile } from '@/api/auth'
import { RootState } from '@/app/store'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const login = createAsyncThunk('auth/login', async (_: ThunkParameter.Login, thunkAPI) => {
  const result = await loginWithEmail(_.email, _.password)
  return result
})
export const profile = createAsyncThunk('auth/profile', async (_, thunkAPI) => {
  const data = await getProfile()
  console.log(data)
  return data
})

export interface AuthState {
  loading: 'idle' | 'pending' | 'done' | 'error'
  loggedIn: boolean
}
const initialState: AuthState = {
  loading: 'idle',
  loggedIn: !!localStorage.getItem('access_token'),
}
export const authSlice = createSlice({
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
      })
  },
})

export const selectLoading = (state: RootState) => state.auth.loading

export default authSlice.reducer
