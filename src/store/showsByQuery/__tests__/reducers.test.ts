import showsByQueryReducer, {
  fetchShowsByQueryStart,
  fetchShowsByQuerySuccess,
  fetchShowsByQueryError,
  clearShowsByQuery,
  initialState,
  ShowsByQueryActionTypes,
  Payload,
} from '../reducers'

describe('showsByQuery reducer', () => {
  it('should return the initial state', () => {
    expect(showsByQueryReducer(undefined, {} as ShowsByQueryActionTypes))
      .toEqual(initialState)
  })

  it('should handle FETCH_SHOWS_BY_QUERY_START', () => {
    const action = fetchShowsByQueryStart()

    expect(showsByQueryReducer(initialState, action)).toEqual({
      ...initialState,
      loading: true,
    })
  })

  it('should handle FETCH_SHOWS_BY_QUERY_SUCCESS', () => {
    const payload: Payload = {
      isLastPage: false,
      page: 1,
      results: ['1', '2', '3'],
      totalPages: 10,
      totalResults: 100,
    }
    const action = fetchShowsByQuerySuccess(payload)

    expect(showsByQueryReducer(initialState, action)).toEqual({
      ...initialState,
      ...payload,
    })
  })

  it('should handle FETCH_SHOWS_BY_QUERY_ERROR', () => {
    const action = fetchShowsByQueryError()

    expect(showsByQueryReducer(initialState, action)).toEqual({
      ...initialState,
      error: true,
    })
  })

  it('should handle CLEAR_SHOWS_BY_QUERY', () => {
    const action = clearShowsByQuery()

    const state = {
      ...initialState,
      results: ['1', '2', '3'],
      page: 2,
    }

    expect(showsByQueryReducer(state, action)).toEqual(initialState)
  })
})
