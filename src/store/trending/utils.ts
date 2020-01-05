import { TredingFields } from './reducers'

const mediaTypes: Record<TredingFields, 'movie' | 'tv'> = {
  todaysTrendingMovies: 'movie',
  weeklyTrendingMovies: 'movie',
  weeklyTrendingShows: 'tv',
}

const timePeriods: Record<TredingFields, 'day' | 'week'> = {
  todaysTrendingMovies: 'day',
  weeklyTrendingMovies: 'week',
  weeklyTrendingShows: 'week',
}

const filterMapper: Record<TredingFields, 'shortMovies' | 'shortShows'> = {
  todaysTrendingMovies: 'shortMovies',
  weeklyTrendingMovies: 'shortMovies',
  weeklyTrendingShows: 'shortShows',
}

export const getMediaType = (field: TredingFields) => mediaTypes[field]
export const getTimePeriod = (field: TredingFields) => timePeriods[field]
export const getFilterField = (field: TredingFields) => filterMapper[field]
