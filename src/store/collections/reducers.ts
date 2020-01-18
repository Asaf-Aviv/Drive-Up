import produce from 'immer'
import { CollectionInStore } from 'store/types'
import withLoadingStates from 'store/helpers/withLoadingStates'
import { Action } from '../helpers'
import { selectShortMovies } from '../shortMoviesByIds/reducers'
import { RootState } from '..'

export const REQUEST_COLLECTION = 'REQUEST_COLLECTION'
export const FETCH_COLLECTION_START = 'FETCH_COLLECTION_START'
export const FETCH_COLLECTION_SUCCESS = 'FETCH_COLLECTION_SUCCESS'
export const FETCH_COLLECTION_ERROR = 'FETCH_COLLECTION_ERROR'

export type RequestCollectionAction = Action<
  typeof REQUEST_COLLECTION,
  undefined,
  { collectionId: string }
>

type FetchCollectionStartAction = Action<typeof FETCH_COLLECTION_START>

type FetchCollectionSuccessAction = Action<
  typeof FETCH_COLLECTION_SUCCESS,
  CollectionInStore | null,
  { collectionId: string }
>

type FetchCollectionErrorAction = Action<typeof FETCH_COLLECTION_ERROR>

export type CollectionActionTypes =
  | RequestCollectionAction
  | FetchCollectionStartAction
  | FetchCollectionSuccessAction
  | FetchCollectionErrorAction

export const requestCollection = (
  collectionId: string,
): CollectionActionTypes => ({
  type: REQUEST_COLLECTION,
  meta: { collectionId },
})

export const fetchCollectionStart = (): CollectionActionTypes => ({
  type: FETCH_COLLECTION_START,
})

export const fetchCollectionSuccess = (
  payload: CollectionInStore | null,
  collectionId: string,
): CollectionActionTypes => ({
  type: FETCH_COLLECTION_SUCCESS,
  payload,
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
) =>
  produce(state, (draft) => {
    switch (action.type) {
      case FETCH_COLLECTION_SUCCESS: {
        const { payload, meta } = action
        const { collectionId } = meta
        draft.byIds[collectionId] = payload
      }
    }
  })

export const selectCollection = (collectionId: string) => (
  state: RootState,
) => {
  if (!(collectionId in state.collections.byIds)) return
  const collection = state.collections.byIds[collectionId]
  if (collection === null) return null

  return {
    ...collection,
    parts: selectShortMovies(collection.parts)(state),
  }
}

export default withLoadingStates({
  start: FETCH_COLLECTION_START,
  success: FETCH_COLLECTION_SUCCESS,
  error: FETCH_COLLECTION_ERROR,
})(collectionsReducer)
