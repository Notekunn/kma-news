import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { LoadingState } from 'shared-types'
import { Types, getAllCategories } from 'shared-api'
import { RootState } from '@/app/store'

export const getAllAction = createAsyncThunk('category/getAll', (_, thunkAPI) => {
  return getAllCategories({})
})
interface CategoryState {
  data: Types.APIResponse.GetAllCategories
  loading: LoadingState
  message?: string
}

const initialState: CategoryState = {
  data: [],
  loading: 'idle',
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAction.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(getAllAction.fulfilled, (state, action) => {
        state.loading = 'done'
        state.data = action.payload
      })
      .addCase(getAllAction.rejected, (state, action) => {
        state.loading = 'error'
        state.message = action.error.message
      })
  },
})

export const selectData = (state: RootState) => state.category.data
export const selectLoading = (state: RootState) => state.category.data
export const selectMessage = (state: RootState) => state.category.message

export default categorySlice.reducer
