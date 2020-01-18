import showsByCategoryReducer, {
  fetchShowsByCategoryStart,
  fetchShowsByCategorySuccess,
  fetchShowsByCategoryError,
  clearShowsByCategory,
  ShowsByCategoryActionTypes,
  initialState,
  Payload,
} from '../reducers'

describe('showsByCategory reducer', () => {
  const category = 'popular'

  it('should return the initial state', () => {
    expect(showsByCategoryReducer(undefined, {} as ShowsByCategoryActionTypes))
      .toEqual(initialState)
  })

  it('should handle FETCH_SHOWS_BY_CATEGORY_START', () => {
    const action = fetchShowsByCategoryStart(category)

    expect(showsByCategoryReducer(initialState, action)).toEqual({
      ...initialState,
      loading: true,
    })
  })

  it('should handle FETCH_SHOWS_BY_CATEGORY_SUCCESS', () => {
    const payload: Payload = {
      isLastPage: false,
      page: 1,
      results: ['1', '2', '3'],
      totalPages: 10,
      totalResults: 100,
    }
    const action = fetchShowsByCategorySuccess(category, payload)

    expect(showsByCategoryReducer(initialState, action)).toEqual({
      ...initialState,
      ...payload,
    })
  })

  it('should handle FETCH_SHOWS_BY_CATEGORY_ERROR', () => {
    const action = fetchShowsByCategoryError(category)

    expect(showsByCategoryReducer(initialState, action)).toEqual({
      ...initialState,
      error: true,
    })
  })

  it('should handle CLEAR_SHOWS_BY_CATEGORY', () => {
    const action = clearShowsByCategory()

    const state = {
      ...initialState,
      results: ['1', '2', '3'],
      page: 2,
    }

    expect(showsByCategoryReducer(state, action)).toEqual(initialState)
  })
})
