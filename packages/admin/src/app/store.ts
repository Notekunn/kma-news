import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import authSlice from '@/features/Auth/authSlice'
import userSlice from '@/features/User/userSlice'
import categorySlice from '@/features/Category/categorySlice'
import optionSlice from '@/features/Option/optionSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    category: categorySlice,
    option: optionSlice,
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
