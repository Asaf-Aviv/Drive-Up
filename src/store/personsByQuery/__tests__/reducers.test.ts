import personsByQueryReducer, {
  fetchPersonsByQueryStart,
  fetchPersonsByQuerySuccess,
  fetchPersonsByQueryError,
  initialState,
  Payload,
  PersonsByQueryActionTypes,
} from '../reducers'

describe('personsByQuery reducer', () => {
  it('should return the initial state', () => {
    expect(personsByQueryReducer(undefined, {} as PersonsByQueryActionTypes))
      .toEqual(initialState)
  })

  it('should handle FETCH_PERSONS_BY_QUERY_START', () => {
    const action = fetchPersonsByQueryStart()

    expect(personsByQueryReducer(initialState, action)).toEqual({
      ...initialState,
      loading: true,
    })
  })

  it('should handle FETCH_PERSONS_BY_QUERY_SUCCESS', () => {
    const payload: Payload = {
      isLastPage: false,
      page: 1,
      results: [],
      totalPages: 10,
      totalResults: 100,
    }
    const action = fetchPersonsByQuerySuccess(payload)

    expect(personsByQueryReducer(initialState, action)).toEqual({
      ...initialState,
      ...payload,
    })
  })

  it('should handle FETCH_PERSONS_BY_QUERY_ERROR', () => {
    const action = fetchPersonsByQueryError()

    expect(personsByQueryReducer(initialState, action)).toEqual({
      ...initialState,
      error: true,
    })
  })
})
