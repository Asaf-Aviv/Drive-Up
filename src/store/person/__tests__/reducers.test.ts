import { Person } from 'store/types'
import personReducer, {
  fetchPersonByIdStart,
  fetchPersonByIdSuccess,
  fetchPersonByIdError,
  PersonByIdActionTypes,
  initialState,
} from '../reducers'

describe('person reducer', () => {
  const personId = '2'

  it('should return the initial state', () => {
    expect(personReducer(undefined, {} as PersonByIdActionTypes))
      .toEqual(initialState)
  })

  it('should handle FETCH_PERSON_BY_ID_START', () => {
    const action = fetchPersonByIdStart()

    expect(personReducer(initialState, action)).toEqual({
      ...initialState,
      loading: true,
    })
  })

  it('should handle FETCH_PERSON_BY_ID_SUCCESS', () => {
    const person = { id: personId } as Person<string>
    const action = fetchPersonByIdSuccess(person, personId)

    expect(personReducer(initialState, action)).toEqual({
      ...initialState,
      byId: {
        [personId]: person,
      },
    })
  })

  it('should handle FETCH_PERSON_BY_ID_ERROR', () => {
    const action = fetchPersonByIdError(personId)

    expect(personReducer(initialState, action)).toEqual({
      ...initialState,
      byId: {},
      error: true,
    })
  })
})
