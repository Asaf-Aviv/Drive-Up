import {
  requestTrendings,
  fetchTrendingsStart,
  fetchTrendingsSuccess,
  fetchTrendingsError,
  TredingFields,
  REQUEST_TRENDINGS,
  FETCH_TRENDINGS_START,
  FETCH_TRENDINGS_SUCCESS,
  FETCH_TRENDINGS_ERROR,
} from '../reducers'

describe('trending actions', () => {
  const tredingField: TredingFields = 'todaysTrendingMovies'
  const meta = {
    fieldName: tredingField,
  }

  it('should create REQUEST_TRENDINGS action', () => {
    expect(requestTrendings(tredingField)).toEqual({
      type: REQUEST_TRENDINGS,
      meta,
    })
  })

  it('should create FETCH_TRENDINGS_START action', () => {
    expect(fetchTrendingsStart(tredingField)).toEqual({
      type: FETCH_TRENDINGS_START,
      meta,
    })
  })

  it('should create FETCH_TRENDINGS_SUCCESS action', () => {
    const payload = ['1', '2', '3']

    expect(fetchTrendingsSuccess(tredingField, payload)).toEqual({
      type: FETCH_TRENDINGS_SUCCESS,
      payload,
      meta,
    })
  })

  it('should create FETCH_TRENDINGS_ERROR action', () => {
    expect(fetchTrendingsError(tredingField)).toEqual({
      type: FETCH_TRENDINGS_ERROR,
      meta,
    })
  })
})
