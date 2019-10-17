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
  yield put(fetchCollectionStart());

  let collection;

  try {
    const { data } = yield call(TMDB.fetchMovieCollection, collectionId);
    collection = data;
  } catch (err) {
    yield put(fetchCollectionError());
    return;
  }

  yield put(fetchCollectionSuccess(collection));
}

export function* requestCollectionWatcher() {
  yield takeLatest(CollectionTypes.REQUEST_COLLECTION, fetchCollection);
}
