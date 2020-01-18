import MoviesByCategoryReducer, {
  fetchMoviesByCategoryStart,
  fetchMoviesByCategorySuccess,
  fetchMoviesByCategoryError,
  clearMoviesByCategory,
  MoviesByCategoryActionTypes,
  initialState,
  Payload,
} from '../reducers'

describe('moviesByCategory reducer', () => {
  const category = 'popular'

  it('should return the initial state', () => {
    expect(MoviesByCategoryReducer(undefined, {} as MoviesByCategoryActionTypes))
      .toEqual(initialState)
  })

  it('should handle FETCH_MOVIES_BY_CATEGORY_START', () => {
    const action = fetchMoviesByCategoryStart(category)

    expect(MoviesByCategoryReducer(initialState, action)).toEqual({
      ...initialState,
      loading: true,
    })
  })

  it('should handle FETCH_MOVIES_BY_CATEGORY_SUCCESS', () => {
    const payload: Payload = {
      isLastPage: false,
      page: 1,
      results: ['1', '2', '3'],
      totalPages: 10,
      totalResults: 100,
    }
    const action = fetchMoviesByCategorySuccess(category, payload)

    expect(MoviesByCategoryReducer(initialState, action)).toEqual({
      ...initialState,
      ...payload,
    })
  })

  it('should handle FETCH_MOVIES_BY_CATEGORY_ERROR', () => {
    const action = fetchMoviesByCategoryError(category)

    expect(MoviesByCategoryReducer(initialState, action)).toEqual({
      ...initialState,
      error: true,
    })
  })

  it('should handle CLEAR_MOVIES_BY_CATEGORY', () => {
    const action = clearMoviesByCategory()

    const state = {
      ...initialState,
      results: ['1', '2', '3'],
      page: 2,
    }

    expect(MoviesByCategoryReducer(state, action)).toEqual(initialState)
  })
})
