import moviesByQueryReducer, {
  fetchMoviesByQueryStart,
  fetchMoviesByQuerySuccess,
  fetchMoviesByQueryError,
  clearMoviesByQuery,
  initialState,
  MoviesByQueryActionTypes,
  Payload,
} from '../reducers'

describe('MoviesByQuery reducer', () => {
  it('should return the initial state', () => {
    expect(moviesByQueryReducer(undefined, {} as MoviesByQueryActionTypes))
      .toEqual(initialState)
  })

  it('should handle FETCH_MOVIE_BY_QUERY_START', () => {
    const action = fetchMoviesByQueryStart()

    expect(moviesByQueryReducer(initialState, action)).toEqual({
      ...initialState,
      loading: true,
    })
  })

  it('should handle FETCH_MOVIES_BY_QUERY_SUCCESS', () => {
    const payload: Payload = {
      isLastPage: false,
      page: 1,
      results: ['1', '2', '3'],
      totalPages: 10,
      totalResults: 100,
    }
    const action = fetchMoviesByQuerySuccess(payload)

    expect(moviesByQueryReducer(initialState, action)).toEqual({
      ...initialState,
      ...payload,
    })
  })

  it('should handle FETCH_MOVIES_BY_QUERY_ERROR', () => {
    const action = fetchMoviesByQueryError()

    expect(moviesByQueryReducer(initialState, action)).toEqual({
      ...initialState,
      error: true,
    })
  })

  it('should handle CLEAR_MOVIES_BY_QUERY', () => {
    const action = clearMoviesByQuery()

    const state = {
      ...initialState,
      results: ['1', '2', '3'],
      page: 2,
    }

    expect(moviesByQueryReducer(state, action)).toEqual(initialState)
  })
})
