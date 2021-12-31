import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'
import { Types } from 'shared-api'
import { IPostModel, IPost } from 'shared-types'

interface renderState {
  data: IPost
  loading: 'idle' | 'pending' | 'done' | 'error'
  message?: string
}
const getOnePost = (url: string | void) => {}
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
export const renderPage = createAsyncThunk('reading/rederPage', async (url, ThunkApi) => {
  const data = await getOnePost(url)
  return data
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
export const selectData = (state: RootState) => state.renderPage.data
export const selectLoading = (state: RootState) => state.renderPage.loading
export const selectError = (state: RootState) => state.renderPage.message

export default readingPageSlice.reducer
