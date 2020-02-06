import { FullShow } from 'store/types'
import { addFullShow, ADD_FULL_SHOW } from '../reducers'

describe('full shows actions', () => {
  it('should create ADD_FULL_SHOW action', () => {
    const showId = '3'
    const show = { id: showId } as FullShow<string>
    const action = addFullShow(show, showId)

    expect(action).toEqual({
      type: ADD_FULL_SHOW,
      payload: show,
      meta: {
        showId,
      },
    })
  })
})
