import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import covid19Slice from '@/features/covid19/covid19Slice'
export const store = configureStore({
  reducer: {
    covid19: covid19Slice,
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
