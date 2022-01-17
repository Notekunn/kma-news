import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoadingState } from 'shared-types'
import { getOptionByName, updateOption, Types } from 'shared-api'
import { RootState } from '@/app/store'

export const getOptionAction = createAsyncThunk('options/get', (name: string) => {
  return getOptionByName(name)
})

export const updateOptionAction = createAsyncThunk(
  '/option/update',
  (option: Types.APIParameter.UpdateOption) => {
    return updateOption(option)
  }
)

interface HeaderMenuOption {
  name: string
  path: string
}

interface OptionState {
  loading: LoadingState
  headerMenu: HeaderMenuOption[]
  message: string
  modalActive: 'menu.add' | 'menu.edit' | 'tag.add' | 'tag.edit' | 'none'
  selectedId: string
}

const initialState: OptionState = {
  loading: 'idle',
  headerMenu: [],
  message: '',
  modalActive: 'none',
  selectedId: '-1',
}

const tryParse = <T>(json: string, defaultValue: T): T => {
  try {
    return JSON.parse(json) as T
  } catch (e) {
    return defaultValue
  }
}

const optionSlice = createSlice({
  name: 'option',
  reducers: {
    toggleAdd: (state, action: PayloadAction<'menu.add' | 'tag.add'>) => {
      state.modalActive = action.payload
    },
    toggleEdit: (
      state,
      action: PayloadAction<{
        modal: 'menu.edit' | 'tag.edit'
        id: string
      }>
    ) => {
      state.modalActive = action.payload.modal
      state.selectedId = action.payload.id
    },
    toggleNone: (state) => {
      state.modalActive = 'none'
      state.selectedId = '-1'
    },
  },
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getOptionAction.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(getOptionAction.fulfilled, (state, action) => {
        state.loading = 'done'
        switch (action.payload.name) {
          case 'header.menu': {
            state.headerMenu = tryParse<HeaderMenuOption[]>(action.payload.value, [])
            break
          }
        }
      })
      .addCase(getOptionAction.rejected, (state, action) => {
        state.loading = 'error'
        state.message = action.error.message || 'Something went wrong'
      })
    builder
      .addCase(updateOptionAction.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(updateOptionAction.fulfilled, (state, action) => {
        state.loading = 'done'
        switch (action.payload.name) {
          case 'header.menu': {
            state.headerMenu = tryParse<HeaderMenuOption[]>(action.payload.value, [])
            break
          }
        }
        state.modalActive = 'none'
      })
      .addCase(updateOptionAction.rejected, (state, action) => {
        state.loading = 'error'
        state.message = action.error.message || 'Something went wrong'
      })
  },
})

export const { toggleAdd, toggleEdit, toggleNone } = optionSlice.actions

export const selectLoading = (state: RootState) => state.option.loading
export const selectMessage = (state: RootState) => state.option.message
export const selectHeaderMenu = (state: RootState) => state.option.headerMenu
export const selectModalAction = (state: RootState) => state.option.modalActive
export const selectSelectedId = (state: RootState) => state.option.selectedId

export default optionSlice.reducer
