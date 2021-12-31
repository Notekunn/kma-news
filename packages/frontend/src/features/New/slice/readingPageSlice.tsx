import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'
import { Types } from 'shared-api'
import { IPostModel, IPost } from 'shared-types'

interface renderState {
  data: IPost
  loading: 'idle' | 'pending' | 'done' | 'error'
  message?: string
}

const initialState: renderState = {
  data: {
    title: '',
    slug: '',
    description: '',
    paragraphs: [],
    thumbnailUrl: '',
    status: 'publish',
    categories: [],
  },
  loading: 'idle',
}
export const renderPage = createAsyncThunk('reading/rederPage', async (url) => {
  const data = await renderPage()
})

export const readingPageSlice = createSlice({
  name: 'renderPage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(renderPage.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(renderPage.fulfilled, (state, payload) => {
        // state.data = payload.payload
        state.loading = 'done'
      })
      .addCase(renderPage.rejected, (state, payload) => {
        state.loading = 'error'
        state.message = payload.error.message
      })
  },
})
export const selectData = (state: RootState) => state.covid19.data
export const selectLoading = (state: RootState) => state.covid19.loading
export const selectError = (state: RootState) => state.covid19.error

export default readingPageSlice.reducer
