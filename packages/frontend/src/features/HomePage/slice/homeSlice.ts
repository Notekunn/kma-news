import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'
import { getAllPosts, Types } from 'shared-api'
import { APIParameter } from '@/../../shared-api/dist/types'

interface HomeState {
  data?: Types.APIResponse.GetAllPosts | {}
  loading: 'idle' | 'pending' | 'done' | 'error'
  message?: string
}

const initialState: HomeState = {
  data: {},
  loading: 'idle',
}

export const dataHomePage = createAsyncThunk(
  'homeSlice/dataHomePage',
  async (params: APIParameter.GetAllPosts, ThunkApi) => {
    const data = await getAllPosts(params)
    return data
  }
)

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(dataHomePage.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(dataHomePage.fulfilled, (state, action) => {
        state.data = action.payload
        state.loading = 'done'
      })
      .addCase(dataHomePage.rejected, (state, action) => {
        state.loading = 'error'
        state.message = action.error.message
      })
  },
})
export const selectData = (state: RootState) => state.home.data
export const selectLoading = (state: RootState) => state.home.loading
export const selectError = (state: RootState) => state.home.message

export default homeSlice.reducer
