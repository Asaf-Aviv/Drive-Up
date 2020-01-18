import {
  REQUEST_MOVIES_BY_CATEGORY,
  FETCH_MOVIES_BY_CATEGORY_START,
  FETCH_MOVIES_BY_CATEGORY_SUCCESS,
  FETCH_MOVIES_BY_CATEGORY_ERROR,
  CLEAR_MOVIES_BY_CATEGORY,
  requestMoviesByCategory,
  fetchMoviesByCategoryStart,
  fetchMoviesByCategorySuccess,
  fetchMoviesByCategoryError,
  clearMoviesByCategory,
  Payload,
} from '../reducers'

describe('movies by category actions', () => {
  const category = 'popular'

  it('should create REQUEST_MOVIES_BY_CATEGORY action', () => {
    expect(requestMoviesByCategory(category, 1)).toEqual({
      type: REQUEST_MOVIES_BY_CATEGORY,
      meta: {
        category,
        page: 1,
      },
    })
  })

  it('should create FETCH_MOVIES_BY_CATEGORY_START action', () => {
    expect(fetchMoviesByCategoryStart(category)).toEqual({
      type: FETCH_MOVIES_BY_CATEGORY_START,
      meta: {
        category,
      },
    })
  })

  it('should create FETCH_MOVIES_BY_CATEGORY_SUCCESS action', () => {
    const payload: Payload = {
      isLastPage: false,
      results: ['1', '2', '3'],
      page: 1,
      totalPages: 20,
      totalResults: 20 * 20,
    }

    expect(fetchMoviesByCategorySuccess(category, payload)).toEqual({
      type: FETCH_MOVIES_BY_CATEGORY_SUCCESS,
      payload,
      meta: {
        category,
      },
    })
  })

  it('should create FETCH_MOVIES_BY_CATEGORY_ERROR action', () => {
    expect(fetchMoviesByCategoryError(category)).toEqual({
      type: FETCH_MOVIES_BY_CATEGORY_ERROR,
      meta: {
        category,
      },
    })
  })

  it('should create CLEAR_MOVIES_BY_CATEGORY action', () => {
    expect(clearMoviesByCategory()).toEqual({
      type: CLEAR_MOVIES_BY_CATEGORY,
    })
  })
})
