import {
  REQUEST_SHOWS_BY_CATEGORY,
  FETCH_SHOWS_BY_CATEGORY_START,
  FETCH_SHOWS_BY_CATEGORY_SUCCESS,
  FETCH_SHOWS_BY_CATEGORY_ERROR,
  CLEAR_SHOWS_BY_CATEGORY,
  requestShowsByCategory,
  fetchShowsByCategoryStart,
  fetchShowsByCategorySuccess,
  fetchShowsByCategoryError,
  clearShowsByCategory,
  Payload,
} from '../reducers'

describe('shows by category actions', () => {
  const category = 'popular'

  it('should create REQUEST_SHOWS_BY_CATEGORY action', () => {
    expect(requestShowsByCategory(category, 1)).toEqual({
      type: REQUEST_SHOWS_BY_CATEGORY,
      meta: {
        category,
        page: 1,
      },
    })
  })

  it('should create FETCH_SHOWS_BY_CATEGORY_START action', () => {
    expect(fetchShowsByCategoryStart(category)).toEqual({
      type: FETCH_SHOWS_BY_CATEGORY_START,
      meta: {
        category,
      },
    })
  })

  it('should create FETCH_SHOWS_BY_CATEGORY_SUCCESS action', () => {
    const payload: Payload = {
      isLastPage: false,
      results: ['1', '2', '3'],
      page: 1,
      totalPages: 20,
      totalResults: 20 * 20,
    }

    expect(fetchShowsByCategorySuccess(category, payload)).toEqual({
      type: FETCH_SHOWS_BY_CATEGORY_SUCCESS,
      payload,
      meta: {
        category,
      },
    })
  })

  it('should create FETCH_SHOWS_BY_CATEGORY_ERROR action', () => {
    expect(fetchShowsByCategoryError(category)).toEqual({
      type: FETCH_SHOWS_BY_CATEGORY_ERROR,
      meta: {
        category,
      },
    })
  })

  it('should create CLEAR_SHOWS_BY_CATEGORY action', () => {
    expect(clearShowsByCategory()).toEqual({
      type: CLEAR_SHOWS_BY_CATEGORY,
    })
  })
})
