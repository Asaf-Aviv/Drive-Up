import searchReducer, {
  initialState,
  SearchActionTypes,
  fetchSearchResultsStart,
  fetchSearchResultsSuccess,
  fetchSearchResultsError,
  clearSearchResults,
  SearchResultsPayload,
} from '../reducers'

describe('search reducer', () => {
  it('should return the initial state', () => {
    expect(searchReducer(undefined, {} as SearchActionTypes))
      .toEqual(initialState)
  })

  it('should handle FETCH_SEARCH_RESULTS_START', () => {
    const action = fetchSearchResultsStart()

    expect(searchReducer(initialState, action)).toEqual({
      ...initialState,
      loading: true,
    })
  })

  it('should handle FETCH_SEARCH_RESULTS_SUCCESS', () => {
    const payload: SearchResultsPayload = {
      isLastPage: false,
      page: 4,
      movies: [],
      shows: [],
      persons: [],
      totalPages: 5,
      totalResults: 100,
    }
    const action = fetchSearchResultsSuccess(payload)

    expect(searchReducer(initialState, action)).toEqual({
      ...initialState,
      ...payload,
    })
  })

  it('should handle FETCH_SEARCH_RESULTS_ERROR', () => {
    const action = fetchSearchResultsError()

    expect(searchReducer(initialState, action)).toEqual({
      ...initialState,
      error: true,
    })
  })

  it('should handle CLEAR_SEARCH_RESULTS', () => {
    const action = clearSearchResults()

    expect(searchReducer(initialState, action))
      .toEqual(initialState)
  })
})
