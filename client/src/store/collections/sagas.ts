import {
  put as untypedPut,
  call,
  PutEffect,
  takeLatest,
} from 'redux-saga/effects';
import {
  RequestCollectionAction,
  CollectionActionTypes,
  fetchCollectionStart,
  fetchCollectionError,
  fetchCollectionSuccess,
} from './actions';
import { CollectionTypes } from './constants';
import TMDB from '../../api';

const put = <A extends CollectionActionTypes>(action: A): PutEffect<A> =>
  untypedPut(action);

export function* fetchCollection({ collectionId }: RequestCollectionAction) {
  try {
    yield put(fetchCollectionStart());
    const { data: collection } = yield call(TMDB.fetchMovieCollection, collectionId);

    yield put(fetchCollectionSuccess(collection));
  } catch (error) {
    yield put(fetchCollectionError());
  }
}

export function* requestCollectionWatcher() {
  yield takeLatest(CollectionTypes.REQUEST_COLLECTION, fetchCollection);
}
