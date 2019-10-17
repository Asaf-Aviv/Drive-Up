import { CollectionTypes } from './constants';
import { CollectionActionTypes } from './actions';
import { Collection } from './interfaces';

interface CollectionsState {
  [collectionId: number]: Collection;
  error: boolean;
  loading: boolean;
}

export const initialState: CollectionsState = {
  loading: false,
  error: false,
};

export default function seasonsReducer(
  state = initialState,
  action: CollectionActionTypes
): CollectionsState {
  switch (action.type) {
    case CollectionTypes.FETCH_COLLECTION_START:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case CollectionTypes.FETCH_COLLECTION_SUCCESS: {
      const { collection } = action;

      return {
        ...state,
        [collection.id]: collection,
        loading: false,
        error: false,
      };
    }
    case CollectionTypes.FETCH_COLLECTION_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
}
