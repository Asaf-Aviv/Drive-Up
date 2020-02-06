import { Collection } from 'store/types'
import {
  REQUEST_COLLECTION,
  FETCH_COLLECTION_START,
  FETCH_COLLECTION_SUCCESS,
  FETCH_COLLECTION_ERROR,
  requestCollection,
  fetchCollectionStart,
  fetchCollectionSuccess,
  fetchCollectionError,
} from '../reducers'

describe('collection actions', () => {
  it('should create REQUEST_COLLECTION action', () => {
    const collectionId = '132'

    expect(requestCollection(collectionId)).toEqual({
      type: REQUEST_COLLECTION,
      meta: {
        collectionId,
      },
    })
  })

  it('should create FETCH_COLLECTION_START action', () => {
    expect(fetchCollectionStart()).toEqual({
      type: FETCH_COLLECTION_START,
    })
  })

  it('should create FETCH_COLLECTION_SUCCESS action', () => {
    const collectionId = '132'
    const payload = {
      id: collectionId,
      parts: ['4', '5', '6'],
    } as unknown as Collection<string>

    expect(fetchCollectionSuccess(payload, collectionId)).toEqual({
      type: FETCH_COLLECTION_SUCCESS,
      payload,
      meta: {
        collectionId,
      },
    })
  })

  it('should create FETCH_COLLECTION_ERROR action', () => {
    expect(fetchCollectionError()).toEqual({
      type: FETCH_COLLECTION_ERROR,
    })
  })
})
