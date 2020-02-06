import { ShortMedia } from 'store/types'
import { ADD_SHORT_SHOWS, addShortShows } from '../reducers'

describe('showsSummary actions', () => {
  it('should create ADD_SHORT_SHOWS action', () => {
    const show = { id: '3' } as ShortMedia
    const action = addShortShows([show])

    expect(action).toEqual({
      type: ADD_SHORT_SHOWS,
      payload: [show],
    })
  })
})
