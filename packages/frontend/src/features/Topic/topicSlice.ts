import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Types, getPostsOnTopic } from 'shared-api'
import { LoadingState } from 'shared-types'
import { RootState } from '@/app/store'

export const getPostsOnTopicAction = createAsyncThunk(
  'topic/getPostsOnTopic',
  (_: Types.APIParameter.GetPostsOnTopic) => {
    return getPostsOnTopic(_)
  }
)

interface TopicState {
  topicContents?: Types.APIResponse.GetPostsOnTopic
  loading: LoadingState
  message?: string
}
const initialState: TopicState = {
  loading: 'idle',
}

const topicSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPostsOnTopicAction.pending, (state, action) => {
        state.loading = 'pending'
      })
      .addCase(getPostsOnTopicAction.fulfilled, (state, action) => {
        state.loading = 'done'
        if (!state.topicContents) {
          state.topicContents = action.payload
        } else {
          state.topicContents.contents = [
            ...state.topicContents.contents,
            ...action.payload.contents,
          ]
        }
      })
      .addCase(getPostsOnTopicAction.rejected, (state, action) => {
        state.loading = 'error'
        state.message = action.error.message
      })
  },
})

export const selectTopicContents = (state: RootState) => state.topic.topicContents
export const selectLoading = (state: RootState) => state.topic.loading
export const selectMessage = (state: RootState) => state.topic.message

export default topicSlice.reducer
