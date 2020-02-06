import { Person } from 'store/types'
import {
  REQUEST_PERSON_BY_ID,
  FETCH_PERSON_BY_ID_START,
  FETCH_PERSON_BY_ID_SUCCESS,
  FETCH_PERSON_BY_ID_ERROR,
  requestPersonById,
  fetchPersonByIdStart,
  fetchPersonByIdSuccess,
  fetchPersonByIdError,
} from '../reducers'

describe('person by id actions', () => {
  const personId = '2'

  it('should create REQUEST_PERSON_BY_ID action', () => {
    expect(requestPersonById(personId)).toEqual({
      type: REQUEST_PERSON_BY_ID,
      meta: {
        personId,
      },
    })
  })

  it('should create FETCH_PERSON_BY_ID_START action', () => {
    expect(fetchPersonByIdStart()).toEqual({
      type: FETCH_PERSON_BY_ID_START,
    })
  })

  it('should create FETCH_PERSON_BY_ID_SUCCESS action', () => {
    const payload = { id: personId } as Person<string>

    expect(fetchPersonByIdSuccess(payload, personId)).toEqual({
      type: FETCH_PERSON_BY_ID_SUCCESS,
      payload,
      meta: {
        personId,
      },
    })
  })

  it('should create FETCH_PERSON_BY_ID_ERROR action', () => {
    expect(fetchPersonByIdError(personId)).toEqual({
      type: FETCH_PERSON_BY_ID_ERROR,
      meta: {
        personId,
      },
    })
  })
})
