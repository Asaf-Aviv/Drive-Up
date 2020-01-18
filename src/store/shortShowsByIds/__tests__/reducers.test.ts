import { ShortMedia } from 'store/types'
import showsSummaryReducer, { addShortShows, AddShowsAction } from '../reducers'

describe('showsSummary reducer', () => {
  it('should return the initial state', () => {
    expect(showsSummaryReducer(undefined, {} as AddShowsAction))
      .toEqual({})
  })

  it('should handle ADD_SHORT_SHOWS', () => {
    const show1 = { id: '1' } as ShortMedia
    const show2 = { id: '2' } as ShortMedia
    const action = addShortShows([show1, show2])

    expect(showsSummaryReducer({}, action)).toEqual({
      1: {
        id: '1',
      },
      2: {
        id: '2',
      },
    })
  })
})
