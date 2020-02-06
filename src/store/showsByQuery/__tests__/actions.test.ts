import {
  requestShowsByQuery,
  fetchShowsByQueryStart,
  fetchShowsByQuerySuccess,
  fetchShowsByQueryError,
  clearShowsByQuery,
  REQUEST_SHOWS_BY_QUERY,
  FETCH_SHOWS_BY_QUERY_START,
  FETCH_SHOWS_BY_QUERY_SUCCESS,
  FETCH_SHOWS_BY_QUERY_ERROR,
  CLEAR_SHOWS_BY_QUERY,
  Payload,
} from '../reducers'

describe('shows by query actions', () => {
  it('should create REQUEST_SHOWS_BY_QUERY action', () => {
    // eslint-disable-next-line @typescript-eslint/camelcase
    const params = { with_genres: 5223 }

    expect(requestShowsByQuery(params, 1)).toEqual({
      type: REQUEST_SHOWS_BY_QUERY,
      meta: {
        params,
        page: 1,
      },
    })
  })

  it('should create FETCH_SHOWS_BY_QUERY_START action', () => {
    expect(fetchShowsByQueryStart()).toEqual({
      type: FETCH_SHOWS_BY_QUERY_START,
    })
  })

  it('should create FETCH_SHOWS_BY_QUERY_SUCCESS action', () => {
    const payload: Payload = {
      isLastPage: false,
      results: ['1', '2', '3'],
      page: 1,
      totalPages: 20,
      totalResults: 20 * 20,
    }

    expect(fetchShowsByQuerySuccess(payload)).toEqual({
      type: FETCH_SHOWS_BY_QUERY_SUCCESS,
      payload,
    })
  })

  it('should create FETCH_SHOWS_BY_QUERY_ERROR action', () => {
    expect(fetchShowsByQueryError()).toEqual({
      type: FETCH_SHOWS_BY_QUERY_ERROR,
    })
  })

  it('should create CLEAR_SHOWS_BY_QUERY action', () => {
    expect(clearShowsByQuery()).toEqual({
      type: CLEAR_SHOWS_BY_QUERY,
    })
  })
})
