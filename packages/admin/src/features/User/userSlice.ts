import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IUser, ObjectWithID, LoadingState } from 'shared-types'
import { getAllUsers, updateUser, createUser, deleteUser, Types } from 'shared-api'
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

export const getAllAction = createAsyncThunk('user/getAll', async (_, thunkAPI) => {
  const data = await getAllUsers({})
  return data
})

export const createAction = createAsyncThunk(
  'user/create',
  async (params: Types.APIParameter.CreateUser, thunkAPI) => {
    const data = await createUser(params)
    return data
  }
)

export const updateAction = createAsyncThunk(
  'user/update',
  async (params: Types.APIParameter.UpdateUser, thunkAPI) => {
    const data = await updateUser(params)
    return data
  }
)

export const deleteAction = createAsyncThunk('user/delete', async (_id: string, thunkAPI) => {
  const data = await deleteUser(_id)
  return data
})

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAction.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(getAllAction.fulfilled, (state, action) => {
        state.loading = 'done'
        state.users = action.payload
      })
      .addCase(getAllAction.rejected, (state, action) => {
        state.loading = 'error'
        state.message = action.error.message
      })

    builder
      .addCase(createAction.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(createAction.fulfilled, (state, action) => {
        state.loading = 'done'
        state.users.push(action.payload)
      })
      .addCase(createAction.rejected, (state, action) => {
        state.loading = 'error'
        state.message = action.error.message
      })

    builder
      .addCase(updateAction.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(updateAction.fulfilled, (state, action) => {
        state.loading = 'done'
        state.users = state.users.map((e) => {
          if (e._id !== action.payload._id) return e
          return action.payload
        })
      })
      .addCase(updateAction.rejected, (state, action) => {
        state.loading = 'error'
        state.message = action.error.message
      })

    builder
      .addCase(deleteAction.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(deleteAction.fulfilled, (state, action) => {
        state.loading = 'done'
        state.users = state.users.filter((e) => e._id !== action.meta.arg)
      })
      .addCase(deleteAction.rejected, (state, action) => {
        state.loading = 'error'
        state.message = action.error.message
      })
  },
})

export const selectLoading = (state: RootState) => state.user.loading
export const selectUsers = (state: RootState) => state.user.users
export const selectMessage = (state: RootState) => state.user.message

export default userSlice.reducer
