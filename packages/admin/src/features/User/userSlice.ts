import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IUser, ObjectWithID, LoadingState } from 'shared-types'
import { getAllUsers } from 'shared-api'
import { RootState } from '@/app/store'

interface UserSliceState {
  users: ObjectWithID<IUser>[]
  loading: LoadingState
  message?: string
}

const initialState: UserSliceState = {
  users: [],
  loading: 'idle',
}

export const getAll = createAsyncThunk('user/getAll', async (_, thunkAPI) => {
  const data = await getAllUsers({})
  return data
})

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAll.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.loading = 'done'
        state.users = action.payload
      })
      .addCase(getAll.rejected, (state, action) => {
        state.loading = 'error'
        state.message = action.error.message
      })
  },
})

export const selectLoading = (state: RootState) => state.user.loading
export const selectUsers = (state: RootState) => state.user.users
export const selectMessage = (state: RootState) => state.user.message

export default userSlice.reducer
