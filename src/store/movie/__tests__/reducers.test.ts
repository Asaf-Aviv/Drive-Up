import movieReducer, {
  fetchMovieByIdStart,
  fetchMovieByIdSuccess,
  fetchMovieByIdError,
  MovieByIdActionTypes,
  initialState,
} from '../reducers'

describe('movie reducer', () => {
  it('should return the initial state', () => {
    expect(movieReducer(undefined, {} as MovieByIdActionTypes))
      .toEqual(initialState)
  })

  it('should handle FETCH_MOVIE_BY_ID_START', () => {
    const action = fetchMovieByIdStart()

    expect(movieReducer(initialState, action)).toEqual({
      ...initialState,
      loading: true,
    })
  })

  it('should handle FETCH_MOVIE_BY_ID_SUCCESS', () => {
    const action = fetchMovieByIdSuccess()

    expect(movieReducer(initialState, action))
      .toEqual(initialState)
  })

  it('should handle FETCH_MOVIE_BY_ID_ERROR', () => {
    const action = fetchMovieByIdError()

    expect(movieReducer(initialState, action)).toEqual({
      ...initialState,
      error: true,
    })
  })
})
