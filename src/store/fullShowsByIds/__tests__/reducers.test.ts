import { FullShow } from 'store/types'
import fullShowsReducer, { addFullShow, AddShowAction } from '../reducers'

describe('fullShows reducer', () => {
  it('should return the initial state', () => {
    expect(fullShowsReducer(undefined, {} as AddShowAction))
      .toEqual({})
  })

  it('should handle ADD_FULL_SHOW', () => {
    const showId = '1'
    const show = { id: showId } as FullShow<string>
    const action = addFullShow(show, showId)

    expect(fullShowsReducer({}, action)).toEqual({
      [showId]: show,
    })
  })
})
