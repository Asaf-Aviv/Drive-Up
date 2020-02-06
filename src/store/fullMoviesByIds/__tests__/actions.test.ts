import { FullMovie } from 'store/types'
import { addFullMovie, ADD_FULL_MOVIE } from '../reducers'

describe('full movies actions', () => {
  it('should create ADD_FULL_MOVIE action', () => {
    const movieId = '3'
    const movie = { id: movieId } as FullMovie<string>
    const action = addFullMovie(movie, movieId)

    expect(action).toEqual({
      type: ADD_FULL_MOVIE,
      payload: movie,
      meta: {
        movieId,
      },
    })
  })
})
