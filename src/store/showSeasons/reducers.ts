import { RootState } from 'store'
import produce from 'immer'
import withLoadingStates from 'store/helpers/withLoadingStates'
import { Action } from 'store/helpers'
import { SeasonWithEpisodes } from '../types'

export const REQUEST_SEASON = 'REQUEST_SEASON'
const FETCH_SEASON_START = 'FETCH_SEASON_START'
const FETCH_SEASON_SUCCESS = 'FETCH_SEASON_SUCCESS'
const FETCH_SEASON_ERROR = 'FETCH_SEASON_ERROR'

export type RequestShowSeasonAction = Action<
  typeof REQUEST_SEASON,
  undefined,
  { seasonNumber: string; showId: string }
>

type FetchShowSeasonStartAction = Action<typeof FETCH_SEASON_START>

type FetchShowSeasonSuccessAction = Action<
  typeof FETCH_SEASON_SUCCESS,
  SeasonWithEpisodes | null,
  { seasonNumber: string; showId: string }
>

type FetchShowSeasonErrorAction = Action<typeof FETCH_SEASON_ERROR>

export type ShowSeasonsActionTypes =
  | RequestShowSeasonAction
  | FetchShowSeasonStartAction
  | FetchShowSeasonSuccessAction
  | FetchShowSeasonErrorAction

export const requestShowSeason = (
  showId: string,
  seasonNumber: string,
): ShowSeasonsActionTypes => ({
  type: REQUEST_SEASON,
  meta: {
    showId,
    seasonNumber,
  },
})

export const fetchShowSeasonStart = (): ShowSeasonsActionTypes => ({
  type: FETCH_SEASON_START,
})

export const fetchShowSeasonSuccess = (
  payload: SeasonWithEpisodes | null,
  meta: {
    showId: string
    seasonNumber: string
  },
): ShowSeasonsActionTypes => ({
  type: FETCH_SEASON_SUCCESS,
  payload,
  meta,
})

export const fetchShowSeasonError = (): ShowSeasonsActionTypes => ({
  type: FETCH_SEASON_ERROR,
})

type ShowSeasonsState = {
  byShowId: {
    [showId: string]: {
      [seasonNumber: string]: SeasonWithEpisodes | null
    }
  }
  error: boolean
  loading: boolean
}

export const initialState: ShowSeasonsState = {
  byShowId: {},
  loading: false,
  error: false,
}

const showSeasonsReducer = (
  state = initialState,
  action: ShowSeasonsActionTypes,
) =>
  produce(state, (draft) => {
    switch (action.type) {
      case FETCH_SEASON_SUCCESS: {
        const { showId, seasonNumber } = action.meta
        draft.byShowId[showId] = draft.byShowId[showId] || {}
        draft.byShowId[showId][seasonNumber] = action.payload
      }
    }
  })

export const selectShowSeason = (showId: string, seasonNumber: string) => (
  state: RootState,
) => state.showSeasons.byShowId[showId]?.[seasonNumber]

type SelectSeasonEpisode = {
  showId: string
  seasonNumber: string
  episodeNumber: string
}

export const selectShowSeasonEpisode = ({
  showId,
  seasonNumber,
  episodeNumber,
}: SelectSeasonEpisode) => ({ showSeasons }: RootState) => {
  const season = showSeasons.byShowId[showId]?.[seasonNumber]
  if (season === undefined) return

  return season?.episodes
    .find(episode => episode.episodeNumber === +episodeNumber) ?? null
}

export default withLoadingStates({
  start: FETCH_SEASON_START,
  success: FETCH_SEASON_SUCCESS,
  error: FETCH_SEASON_ERROR,
})(showSeasonsReducer)
