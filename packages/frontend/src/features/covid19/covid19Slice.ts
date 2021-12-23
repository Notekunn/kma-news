import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { COVID19_API } from '@/constants/covid19'
import type { RootState } from '@/app/store'

interface LocationReport {
  name: string
  death: number
  treating: number
  recovered: number
  cases: number
  casesToday: number
}
type LocationField =
  | 'cases'
  | 'death'
  | 'treating'
  | 'recovered'
  | 'casesToday'
  | 'deathToday'
  | 'recoveredToday'
  | 'treatingToday'
type LocationData = Record<LocationField, number>
type APIResponse =
  | Record<'total' | 'today', Record<'internal' | 'world', LocationReport>> &
      Record<'locations', LocationReport[]>

type Covid19StateData = Record<'internal' | 'world', LocationData> &
  Record<'locations', Array<LocationData & Record<'name', string>>>

interface Covid19State {
  data: Covid19StateData | null
  loading: 'idle' | 'pending' | 'done' | 'error'
  error?: string
}

const initialState: Covid19State = {
  data: null,
  loading: 'idle',
}

export const fetchCovid19Data = createAsyncThunk<Covid19StateData>('covid19/fetch', async () => {
  const { data } = await axios.get<APIResponse>(COVID19_API)
  const { locations, total, today } = data
  return {
    locations,
    internal: {
      cases: total.internal.cases,
      casesToday: today.internal.cases,
      death: total.internal.death,
      deathToday: today.internal.death,
      recovered: total.internal.recovered,
      recoveredToday: today.internal.recovered,
      treating: total.internal.treating,
      treatingToday: today.internal.treating,
    },
    world: {
      cases: total.world.cases,
      casesToday: today.world.cases,
      death: total.world.death,
      deathToday: today.world.death,
      recovered: total.world.recovered,
      recoveredToday: today.world.recovered,
      treating: total.world.treating,
      treatingToday: today.world.treating,
    },
  } as Covid19StateData
})

export const covid19Slice = createSlice({
  name: 'covid19',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCovid19Data.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(fetchCovid19Data.fulfilled, (state, payload) => {
        state.data = payload.payload
        state.loading = 'done'
      })
      .addCase(fetchCovid19Data.rejected, (state, payload) => {
        state.loading = 'error'
        state.error = payload.error.message
      })
  },
})
export const selectData = (state: RootState) => state.covid19.data
export const selectLoading = (state: RootState) => state.covid19.loading
export const selectError = (state: RootState) => state.covid19.error

export default covid19Slice.reducer
