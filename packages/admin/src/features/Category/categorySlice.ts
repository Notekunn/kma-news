import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { LoadingState, ModalState } from 'shared-types'
import { Types, getAllCategories, createCategory, updateCategory, deleteCategory } from 'shared-api'
import { RootState } from '@/app/store'

export const getAllAction = createAsyncThunk('category/getAll', (_, thunkAPI) => {
  return getAllCategories({})
})

export const createAction = createAsyncThunk(
  'category/create',
  (_: Types.APIParameter.CreateCategory, thunkAPI) => {
    return createCategory(_)
  }
)

export const updateAction = createAsyncThunk(
  'category/update',
  (_: Types.APIParameter.UpdateCategory, thunkAPI) => {
    return updateCategory(_)
  }
)

export const deleteAction = createAsyncThunk('category/delete', (_: string, thunkAPI) => {
  return deleteCategory(_)
})

interface CategoryState {
  data: Types.APIResponse.GetAllCategories
  loading: LoadingState
  message?: string
  modalAction: ModalState
  selectedId: string | null
}

const initialState: CategoryState = {
  data: [],
  loading: 'idle',
  modalAction: 'none',
  selectedId: null,
}
const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    toggleAdd: (state) => {
      state.modalAction = 'add'
    },
    toggleEdit: (state, action: PayloadAction<string>) => {
      state.modalAction = 'edit'
      state.selectedId = action.payload
    },
    toggleNone: (state) => {
      state.modalAction = 'none'
      state.selectedId = null
    },
  },
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
    builder
      .addCase(createAction.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(createAction.fulfilled, (state, action) => {
        state.loading = 'done'
        state.data.push(action.payload)
        state.modalAction = 'none'
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
        state.data = state.data.map((e) => {
          if (e._id !== action.payload._id) return e
          return action.payload
        })
        state.modalAction = 'none'
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
        state.data = state.data.filter((e) => e._id !== action.payload._id)
      })
      .addCase(deleteAction.rejected, (state, action) => {
        state.loading = 'error'
        state.message = action.error.message
      })
  },
})

export const { toggleAdd, toggleEdit, toggleNone } = categorySlice.actions

export const selectData = (state: RootState) => state.category.data
export const selectLoading = (state: RootState) => state.category.loading
export const selectMessage = (state: RootState) => state.category.message
export const selectModalAction = (state: RootState) => state.category.modalAction
export const selectSelectedId = (state: RootState) => state.category.selectedId

export default categorySlice.reducer
