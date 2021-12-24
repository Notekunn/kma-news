import { createSlice } from '@reduxjs/toolkit'
import { IUser, ObjectWithID, LoadingState } from 'shared-types'

interface UserSliceState {
  users: ObjectWithID<IUser>[]
  loading: LoadingState
}

const initialState: UserSliceState = {
  users: [],
  loading: 'idle',
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
})

export default userSlice.reducer
