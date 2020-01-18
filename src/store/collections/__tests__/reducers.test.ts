import { Collection } from 'store/types'
import collectionReducer, {
  fetchCollectionStart,
  fetchCollectionSuccess,
  fetchCollectionError,
  initialState,
  CollectionActionTypes,
} from '../reducers'

describe('collection reducer', () => {
  it('should return the initial state', () => {
    expect(collectionReducer(undefined, {} as CollectionActionTypes))
      .toEqual(initialState)
  })

  it('should handle FETCH_COLLECTION_START', () => {
    const action = fetchCollectionStart()

    expect(collectionReducer(initialState, action)).toEqual({
      ...initialState,
      loading: true,
    })
  })

  it('should handle FETCH_COLLECTION_SUCCESS', () => {
    const collectionId = '123'
    const payload = {
      id: collectionId,
      parts: ['1', '2', '3'],
    } as Collection<string>
    const action = fetchCollectionSuccess(payload, collectionId)

    expect(collectionReducer(initialState, action)).toEqual({
      ...initialState,
      byIds: {
        [collectionId]: payload,
      },
    })
  })

  it('should handle FETCH_COLLECTION_ERROR', () => {
    const action = fetchCollectionError()

    expect(collectionReducer(initialState, action)).toEqual({
      ...initialState,
      error: true,
    })
  })
})
