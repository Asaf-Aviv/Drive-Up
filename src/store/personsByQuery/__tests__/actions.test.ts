import {
  requestPersonsByQuery,
  fetchPersonsByQueryStart,
  fetchPersonsByQuerySuccess,
  fetchPersonsByQueryError,
  REQUEST_PERSONS_BY_QUERY,
  FETCH_PERSONS_BY_QUERY_START,
  FETCH_PERSONS_BY_QUERY_SUCCESS,
  FETCH_PERSONS_BY_QUERY_ERROR,
  Payload,
} from '../reducers'

describe('persons by query actions', () => {
  it('should create REQUEST_PERSONS_BY_QUERY action', () => {
    expect(requestPersonsByQuery(undefined, 3)).toEqual({
      type: REQUEST_PERSONS_BY_QUERY,
      meta: {
        page: 3,
      },
    })
  })

  it('should create FETCH_PERSONS_BY_QUERY_START action', () => {
    expect(fetchPersonsByQueryStart()).toEqual({
      type: FETCH_PERSONS_BY_QUERY_START,
    })
  })

  it('should create FETCH_PERSONS_BY_QUERY_SUCCESS action', () => {
    const payload: Payload = {
      isLastPage: false,
      results: [],
      page: 1,
      totalPages: 20,
      totalResults: 20 * 20,
    }

    expect(fetchPersonsByQuerySuccess(payload)).toEqual({
      type: FETCH_PERSONS_BY_QUERY_SUCCESS,
      payload,
    })
  })

  it('should create FETCH_PERSONS_BY_QUERY_ERROR action', () => {
    expect(fetchPersonsByQueryError()).toEqual({
      type: FETCH_PERSONS_BY_QUERY_ERROR,
    })
  })
})
