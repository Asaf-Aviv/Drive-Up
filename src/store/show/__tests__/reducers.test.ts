import showReducer, {
  fetchShowByIdStart,
  fetchShowByIdSuccess,
  fetchShowByIdError,
  ShowByIdActionTypes,
  initialState,
} from '../reducers'

describe('show reducer', () => {
  it('should return the initial state', () => {
    expect(showReducer(undefined, {} as ShowByIdActionTypes))
      .toEqual(initialState)
  })

  it('should handle FETCH_SHOW_BY_ID_START', () => {
    const action = fetchShowByIdStart()

    expect(showReducer(initialState, action)).toEqual({
      ...initialState,
      loading: true,
    })
  })

  it('should handle FETCH_SHOW_BY_ID_SUCCESS', () => {
    const action = fetchShowByIdSuccess()

    expect(showReducer(initialState, action))
      .toEqual(initialState)
  })

  it('should handle FETCH_SHOW_BY_ID_ERROR', () => {
    const action = fetchShowByIdError()

    expect(showReducer(initialState, action)).toEqual({
      ...initialState,
      error: true,
    })
  })
})
