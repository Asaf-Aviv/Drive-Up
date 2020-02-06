import {
  REQUEST_SHOW_BY_ID,
  FETCH_SHOW_BY_ID_START,
  FETCH_SHOW_BY_ID_SUCCESS,
  FETCH_SHOW_BY_ID_ERROR,
  requestShowById,
  fetchShowByIdStart,
  fetchShowByIdSuccess,
  fetchShowByIdError,
} from '../reducers'

describe('show by id actions', () => {
  it('should create REQUEST_SHOW_BY_ID action', () => {
    const showId = '2'

    expect(requestShowById(showId)).toEqual({
      type: REQUEST_SHOW_BY_ID,
      meta: {
        showId,
      },
    })
  })

  it('should create FETCH_SHOW_BY_ID_START action', () => {
    expect(fetchShowByIdStart()).toEqual({
      type: FETCH_SHOW_BY_ID_START,
    })
  })

  it('should create FETCH_SHOW_BY_ID_SUCCESS action', () => {
    expect(fetchShowByIdSuccess()).toEqual({
      type: FETCH_SHOW_BY_ID_SUCCESS,
    })
  })

  it('should create FETCH_SHOW_BY_ID_ERROR action', () => {
    expect(fetchShowByIdError()).toEqual({
      type: FETCH_SHOW_BY_ID_ERROR,
    })
  })
})
