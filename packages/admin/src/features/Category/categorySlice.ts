import { createSlice } from '@reduxjs/toolkit'
import { ICategory, LoadingState, ObjectWithID } from 'shared-types'
import { Types } from 'shared-api'
import { RootState } from '@/app/store'

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
})

export const selectData = (state: RootState) => state.category.data
export const selectLoading = (state: RootState) => state.category.data
export const selectMessage = (state: RootState) => state.category.message

export default categorySlice.reducer
