import {
  requestMoviesByQuery,
  fetchMoviesByQueryStart,
  fetchMoviesByQuerySuccess,
  fetchMoviesByQueryError,
  clearMoviesByQuery,
  REQUEST_MOVIES_BY_QUERY,
  FETCH_MOVIES_BY_QUERY_START,
  FETCH_MOVIES_BY_QUERY_SUCCESS,
  FETCH_MOVIES_BY_QUERY_ERROR,
  CLEAR_MOVIES_BY_QUERY,
  Payload,
} from '../reducers'

describe('movies by query actions', () => {
  it('should create REQUEST_MOVIES_BY_QUERY action', () => {
    // eslint-disable-next-line @typescript-eslint/camelcase
    const params = { with_genres: 5223 }

    expect(requestMoviesByQuery(params, 1)).toEqual({
      type: REQUEST_MOVIES_BY_QUERY,
      meta: {
        params,
        page: 1,
      },
    })
  })

  it('should create FETCH_MOVIES_BY_QUERY_START action', () => {
    expect(fetchMoviesByQueryStart()).toEqual({
      type: FETCH_MOVIES_BY_QUERY_START,
    })
  })

  it('should create FETCH_MOVIES_BY_QUERY_SUCCESS action', () => {
    const payload: Payload = {
      isLastPage: false,
      results: ['1', '2', '3'],
      page: 1,
      totalPages: 20,
      totalResults: 20 * 20,
    }

    expect(fetchMoviesByQuerySuccess(payload)).toEqual({
      type: FETCH_MOVIES_BY_QUERY_SUCCESS,
      payload,
    })
  })

  it('should create FETCH_MOVIES_BY_QUERY_ERROR action', () => {
    expect(fetchMoviesByQueryError()).toEqual({
      type: FETCH_MOVIES_BY_QUERY_ERROR,
    })
  })

  it('should create CLEAR_MOVIES_BY_QUERY action', () => {
    expect(clearMoviesByQuery()).toEqual({
      type: CLEAR_MOVIES_BY_QUERY,
    })
  })
})
