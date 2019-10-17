import { CollectionTypes } from './constants';
import { Collection } from './interfaces';

export interface RequestCollectionAction {
  type: typeof CollectionTypes.REQUEST_COLLECTION;
  collectionId: string;
}

interface FetchCollectionStartAction {
  type: typeof CollectionTypes.FETCH_COLLECTION_START;
}

interface FetchCollectionSuccessAction {
  type: typeof CollectionTypes.FETCH_COLLECTION_SUCCESS;
  collection: Collection;
}

interface FetchCollectionErrorAction {
  type: typeof CollectionTypes.FETCH_COLLECTION_ERROR;
}

export type CollectionActionTypes =
  | RequestCollectionAction
  | FetchCollectionStartAction
  | FetchCollectionSuccessAction
  | FetchCollectionErrorAction;

export const requestCollection = (collectionId: string): CollectionActionTypes => ({
  type: CollectionTypes.REQUEST_COLLECTION,
  collectionId,
});

export const fetchCollectionStart = (): CollectionActionTypes => ({
  type: CollectionTypes.FETCH_COLLECTION_START,
});

export const fetchCollectionSuccess = (collection: Collection): CollectionActionTypes => ({
  type: CollectionTypes.FETCH_COLLECTION_SUCCESS,
  collection,
});

export const fetchCollectionError = (): CollectionActionTypes => ({
  type: CollectionTypes.FETCH_COLLECTION_ERROR,
});
