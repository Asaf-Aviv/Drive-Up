import {
  REQUEST_SEARCH_RESULTS,
  FETCH_SEARCH_RESULTS_START,
  FETCH_SEARCH_RESULTS_SUCCESS,
  FETCH_SEARCH_RESULTS_ERROR,
  CLEAR_SEARCH_RESULTS,
  requestSearchResults,
  fetchSearchResultsStart,
  fetchSearchResultsSuccess,
  fetchSearchResultsError,
  clearSearchResults,
  SearchResultsPayload,
} from '../reducers'

describe('search actions', () => {
  it('should create REQUEST_SEARCH_RESULTS action', () => {
    const category = 'multi'
    const params = { query: 'Spiderman' }
    const page = 4
    const action = requestSearchResults(category, params, page)

    expect(action).toEqual({
      type: REQUEST_SEARCH_RESULTS,
      meta: {
        category,
        params,
        page,
      },
    })
  })

  it('should create FETCH_SEARCH_RESULTS_START action', () => {
    const action = fetchSearchResultsStart()

    expect(action).toEqual({
      type: FETCH_SEARCH_RESULTS_START,
    })
  })

  it('should create FETCH_SEARCH_RESULTS_SUCCESS action', () => {
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

    expect(action).toEqual({
      type: FETCH_SEARCH_RESULTS_SUCCESS,
      payload,
    })
  })

  it('should create FETCH_SEARCH_RESULTS_ERROR action', () => {
    const action = fetchSearchResultsError()

    expect(action).toEqual({
      type: FETCH_SEARCH_RESULTS_ERROR,
    })
  })
  it('should create CLEAR_SEARCH_RESULTS action', () => {
    const action = clearSearchResults()

    expect(action).toEqual({
      type: CLEAR_SEARCH_RESULTS,
    })
  })
})
