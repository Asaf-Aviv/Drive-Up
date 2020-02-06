import { ShortMedia } from 'store/types'
import moviesSummaryReducer, { addShortMovies, AddMoviesAction } from '../reducers'

describe('moviesSummary reducer', () => {
  it('should return the initial state', () => {
    expect(moviesSummaryReducer(undefined, {} as AddMoviesAction))
      .toEqual({})
  })

  it('should handle ADD_SHORT_MOVIES', () => {
    const movie1 = { id: '1' } as ShortMedia
    const movie2 = { id: '2' } as ShortMedia
    const action = addShortMovies([movie1, movie2])

    expect(moviesSummaryReducer({}, action)).toEqual({
      1: {
        id: '1',
      },
      2: {
        id: '2',
      },
    })
  })
})
