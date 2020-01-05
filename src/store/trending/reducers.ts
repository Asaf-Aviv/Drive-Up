import produce from 'immer'
import { RootState } from 'store'
import { LoadingStates } from '../types'

export type TredingFields =
  | 'todaysTrendingMovies'
  | 'weeklyTrendingMovies'
  | 'weeklyTrendingShows'

export const REQUEST_TRENDINGS = 'REQUEST_TRENDINGS'
const FETCH_TRENDINGS_START = 'FETCH_TRENDINGS_START'
const FETCH_TRENDINGS_SUCCESS = 'FETCH_TRENDINGS_SUCCESS'
const FETCH_TRENDINGS_ERROR = 'FETCH_TRENDINGS_ERROR'

type TrendingsActionTypeCreator<T, P = never> = {
  type: T
  payload?: P
  meta: {
    fieldName: TredingFields
  }
}

export type RequestTrendingsAction = TrendingsActionTypeCreator<
  typeof REQUEST_TRENDINGS
>

type FetchTrendingsStartAction = TrendingsActionTypeCreator<
  typeof FETCH_TRENDINGS_START
>

type FetchTrendingsSuccessAction = TrendingsActionTypeCreator<
  typeof FETCH_TRENDINGS_SUCCESS,
  string[]
>

type FetchTrendingsErrorAction = TrendingsActionTypeCreator<
  typeof FETCH_TRENDINGS_ERROR
>

type TrendingActionTypes =
  | RequestTrendingsAction
  | FetchTrendingsStartAction
  | FetchTrendingsSuccessAction
  | FetchTrendingsErrorAction

export const requestTrendings = (
  fieldName: TredingFields,
): TrendingActionTypes => ({
  type: REQUEST_TRENDINGS,
  meta: {
    fieldName,
  },
})

export const fetchTrendingsStart = (
  fieldName: TredingFields,
): TrendingActionTypes => ({
  type: FETCH_TRENDINGS_START,
  meta: {
    fieldName,
  },
})

export const fetchTrendingsSuccess = (
  fieldName: TredingFields,
  payload: string[],
): TrendingActionTypes => ({
  type: FETCH_TRENDINGS_SUCCESS,
  payload,
  meta: {
    fieldName,
  },
})

export const fetchTrendingsError = (
  fieldName: TredingFields,
): TrendingActionTypes => ({
  type: FETCH_TRENDINGS_ERROR,
  meta: {
    fieldName,
  },
})

type TrendingSlice = {
  results: string[]
} & LoadingStates

const initialStateSlice: TrendingSlice = {
  results: [],
  loading: false,
  error: false,
}

type TrendingState = Record<TredingFields, TrendingSlice>

export const initialState: TrendingState = {
  todaysTrendingMovies: initialStateSlice,
  weeklyTrendingMovies: initialStateSlice,
  weeklyTrendingShows: initialStateSlice,
}

const trendingReducer = (
  state = initialState,
  action: TrendingActionTypes,
) => produce(state, (draft) => {
  switch (action.type) {
    case FETCH_TRENDINGS_START: {
      const { meta: { fieldName } } = action
      draft[fieldName].loading = true
      draft[fieldName].error = false
      break
    }
    case FETCH_TRENDINGS_SUCCESS: {
      const { payload, meta: { fieldName } } = action
      draft[fieldName].results = payload
      draft[fieldName].loading = false
      break
    }
    case FETCH_TRENDINGS_ERROR: {
      const { meta: { fieldName } } = action
      draft[fieldName].loading = false
      draft[fieldName].error = true
      break
    }
  }
})

export const selectTodaysTrendingMovies = (state: RootState) =>
  state.trending.todaysTrendingMovies.results.map(id => state.shortMovies[id])

export const selectWeeklyTrendingMovies = (state: RootState) =>
  state.trending.weeklyTrendingMovies.results.map(id => state.shortMovies[id])

export const selectWeeklyTrendingShows = (state: RootState) =>
  state.trending.weeklyTrendingShows.results.map(id => state.shortShows[id])

export default trendingReducer
