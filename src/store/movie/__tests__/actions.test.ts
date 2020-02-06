import {
  REQUEST_MOVIE_BY_ID,
  FETCH_MOVIE_BY_ID_START,
  FETCH_MOVIE_BY_ID_SUCCESS,
  FETCH_MOVIE_BY_ID_ERROR,
  requestMovieById,
  fetchMovieByIdStart,
  fetchMovieByIdSuccess,
  fetchMovieByIdError,
} from '../reducers'

describe('movie by id actions', () => {
  it('should create REQUEST_MOVIE_BY_ID action', () => {
    const movieId = '2'

    expect(requestMovieById(movieId)).toEqual({
      type: REQUEST_MOVIE_BY_ID,
      meta: {
        movieId,
      },
    })
  })

  it('should create FETCH_MOVIE_BY_ID_START action', () => {
    expect(fetchMovieByIdStart()).toEqual({
      type: FETCH_MOVIE_BY_ID_START,
    })
  })

  it('should create FETCH_MOVIE_BY_ID_SUCCESS action', () => {
    expect(fetchMovieByIdSuccess()).toEqual({
      type: FETCH_MOVIE_BY_ID_SUCCESS,
    })
  })

  it('should create FETCH_MOVIE_BY_ID_ERROR action', () => {
    expect(fetchMovieByIdError()).toEqual({
      type: FETCH_MOVIE_BY_ID_ERROR,
    })
  })
})
