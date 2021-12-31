import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import covid19Slice from '@/features/covid19/covid19Slice'
import authSlice from '@/features/Auth/authSlice'
import postSlice from '@/features/Post/postSlice'

console.log(process.env.REACT_APP_API_URL)

export const store = configureStore({
  reducer: {
    covid19: covid19Slice,
    auth: authSlice,
    post: postSlice,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
