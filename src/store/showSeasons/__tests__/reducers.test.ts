import { SeasonWithEpisodes } from 'store/types'
import showSeasonsReducer, {
  fetchShowSeasonStart,
  fetchShowSeasonSuccess,
  fetchShowSeasonError,
  initialState,
  ShowSeasonsActionTypes,
} from '../reducers'

describe('showSeasons reducer', () => {
  it('should return the initial state', () => {
    expect(showSeasonsReducer(undefined, {} as ShowSeasonsActionTypes))
      .toEqual(initialState)
  })

  it('should handle FETCH_SEASON_START', () => {
    const action = fetchShowSeasonStart()

    expect(showSeasonsReducer(initialState, action)).toEqual({
      ...initialState,
      loading: true,
    })
  })

  it('should handle FETCH_SEASON_SUCCESS', () => {
    const showId = '1'
    const seasonNumber = '2'
    const payload = { showId } as unknown as SeasonWithEpisodes

    const action = fetchShowSeasonSuccess(payload, {
      showId,
      seasonNumber,
    })

    expect(showSeasonsReducer(initialState, action)).toEqual({
      ...initialState,
      byShowId: {
        [showId]: {
          [seasonNumber]: payload,
        },
      },
    })
  })

  it('should handle FETCH_SEASON_ERROR', () => {
    const action = fetchShowSeasonError()

    expect(showSeasonsReducer(initialState, action)).toEqual({
      ...initialState,
      error: true,
    })
  })
})
