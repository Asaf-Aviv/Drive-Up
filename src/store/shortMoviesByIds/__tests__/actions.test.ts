import { ShortMedia } from 'store/types'
import { addShortMovies, ADD_SHORT_MOVIES } from '../reducers'

describe('moviesSummary actions', () => {
  it('should create ADD_SHORT_MOVIES action', () => {
    const movie = { id: '3' } as ShortMedia
    const action = addShortMovies([movie])

    expect(action).toEqual({
      type: ADD_SHORT_MOVIES,
      payload: [movie],
    })
  })
})
