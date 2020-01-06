import produce from 'immer'
import { Collection, CollectionInStore } from 'store/types'
import { selectShortMovies } from '../shortMoviesByIds/reducers'
import { RootState } from '..'

export const REQUEST_COLLECTION = 'REQUEST_COLLECTION'
const FETCH_COLLECTION_START = 'FETCH_COLLECTION_START'
const FETCH_COLLECTION_SUCCESS = 'FETCH_COLLECTION_SUCCESS'
const FETCH_COLLECTION_ERROR = 'FETCH_COLLECTION_ERROR'

export type RequestCollectionAction = {
  type: typeof REQUEST_COLLECTION
  collectionId: string
}

type FetchCollectionStartAction = {
  type: typeof FETCH_COLLECTION_START
}

type FetchCollectionSuccessAction = {
  type: typeof FETCH_COLLECTION_SUCCESS
  collection: CollectionInStore | null
  meta: {
    collectionId: string
  }
}

type FetchCollectionErrorAction = {
  type: typeof FETCH_COLLECTION_ERROR
}

export type CollectionActionTypes =
  | RequestCollectionAction
  | FetchCollectionStartAction
  | FetchCollectionSuccessAction
  | FetchCollectionErrorAction

export const requestCollection = (
  collectionId: string,
): CollectionActionTypes => ({
  type: REQUEST_COLLECTION,
  collectionId,
})

export const fetchCollectionStart = (): CollectionActionTypes => ({
  type: FETCH_COLLECTION_START,
})

export const fetchCollectionSuccess = (
  collection: CollectionInStore | null,
  collectionId: string,
): CollectionActionTypes => ({
  type: FETCH_COLLECTION_SUCCESS,
  collection,
  meta: {
    collectionId,
  },
})

export const fetchCollectionError = (): CollectionActionTypes => ({
  type: FETCH_COLLECTION_ERROR,
})

type CollectionsState = {
  byIds: Record<string, CollectionInStore | null>
  error: boolean
  loading: boolean
}

export const initialState: CollectionsState = {
  byIds: {},
  loading: false,
  error: false,
}

const collectionsReducer = (
  state = initialState,
  action: CollectionActionTypes,
) => produce(state, (draft) => {
  switch (action.type) {
    case FETCH_COLLECTION_START:
      draft.loading = true
      draft.error = false
      break
    case FETCH_COLLECTION_SUCCESS: {
      const { collection, meta: { collectionId } } = action

      draft.byIds[collectionId] = collection
      draft.loading = false
      break
    }
    case FETCH_COLLECTION_ERROR:
      draft.loading = false
      draft.error = true
  }
})

export const selectCollection = (collectionId: string) => (
  state: RootState,
): Collection | null => {
  if (!(collectionId in state.collections.byIds)) return
  const collection = state.collections.byIds[collectionId]
  if (collection === null) return null

  return {
    ...collection,
    parts: selectShortMovies(collection.parts)(state),
  }
}

export default collectionsReducer
