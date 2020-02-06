import { SeasonWithEpisodes } from 'store/types'
import {
  requestShowSeason,
  fetchShowSeasonStart,
  fetchShowSeasonSuccess,
  fetchShowSeasonError,
  FETCH_SEASON_START,
  FETCH_SEASON_SUCCESS,
  FETCH_SEASON_ERROR,
  REQUEST_SEASON,
} from '../reducers'

describe('show season actions', () => {
  const showId = '5'
  const seasonNumber = '4'

  it('should create REQUEST_SEASON action', () => {
    expect(requestShowSeason(showId, seasonNumber)).toEqual({
      type: REQUEST_SEASON,
      meta: {
        showId,
        seasonNumber,
      },
    })
  })

  it('should create FETCH_SEASON_START action', () => {
    expect(fetchShowSeasonStart()).toEqual({
      type: FETCH_SEASON_START,
    })
  })

  it('should create FETCH_SEASON_SUCCESS action', () => {
    const payload = { showId } as unknown as SeasonWithEpisodes
    const meta = { showId, seasonNumber }

    expect(fetchShowSeasonSuccess(payload, meta)).toEqual({
      type: FETCH_SEASON_SUCCESS,
      payload,
      meta,
    })
  })

  it('should create FETCH_SEASON_ERROR action', () => {
    expect(fetchShowSeasonError()).toEqual({
      type: FETCH_SEASON_ERROR,
    })
  })
})
