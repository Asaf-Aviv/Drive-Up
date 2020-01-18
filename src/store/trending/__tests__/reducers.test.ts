import trendingReducer, {
  fetchTrendingsStart,
  fetchTrendingsSuccess,
  fetchTrendingsError,
  initialState,
  TrendingActionTypes,
} from '../reducers'

describe('trendings reducer', () => {
  const trendingField = 'todaysTrendingMovies'

  it('should return the initial state', () => {
    expect(trendingReducer(undefined, {} as TrendingActionTypes))
      .toEqual(initialState)
  })

  it('should handle FETCH_TRENDINGS_START', () => {
    const action = fetchTrendingsStart(trendingField)

    expect(trendingReducer(initialState, action)).toEqual({
      ...initialState,
      [trendingField]: {
        ...initialState[trendingField],
        loading: true,
      },
    })
  })

  it('should handle FETCH_TRENDINGS_SUCCESS', () => {
    const payload = ['1', '2', '3']
    const action = fetchTrendingsSuccess(trendingField, payload)

    expect(trendingReducer(initialState, action)).toEqual({
      ...initialState,
      [trendingField]: {
        ...initialState[trendingField],
        results: payload,
      },
    })
  })

  it('should handle FETCH_TRENDINGS_ERROR', () => {
    const action = fetchTrendingsError(trendingField)

    expect(trendingReducer(initialState, action)).toEqual({
      ...initialState,
      [trendingField]: {
        ...initialState[trendingField],
        error: true,
      },
    })
  })
})
