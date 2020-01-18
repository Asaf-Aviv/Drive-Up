import { FullMovie } from 'store/types'
import fullMoviesReducer, { addFullMovie, AddMovieAction } from '../reducers'

describe('fullMovies reducer', () => {
  it('should return the initial state', () => {
    expect(fullMoviesReducer(undefined, {} as AddMovieAction))
      .toEqual({})
  })

  it('should handle ADD_FULL_MOVIE', () => {
    const movieId = '1'
    const movie = { id: movieId } as FullMovie<string>
    const action = addFullMovie(movie, movieId)

    expect(fullMoviesReducer({}, action)).toEqual({
      [movieId]: movie,
    })
  })
})
