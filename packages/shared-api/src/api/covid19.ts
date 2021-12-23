import client from 'axios'
import { APIResponse } from 'types'

export const COVID19_API = 'https://static.pipezero.com/covid/data.json'

/**
 * Fetch general data of covid 19
 */
export const fetchCovid19General: () => Promise<APIResponse.Covid19> = async () => {
  const { data } = await client.get<APIResponse.Covid19Raw>(COVID19_API)
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
  } as APIResponse.Covid19
}
