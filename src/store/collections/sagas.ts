import { ShortMedia } from 'store/types'
import filterExistingMedia from 'store/helpers/filterExistingMedia'
import { put, call, takeLatest } from 'redux-saga/effects'
import { Collection } from '../types'
import { addShortMovies } from '../shortMoviesByIds/reducers'
import {
  REQUEST_COLLECTION,
  RequestCollectionAction,
  fetchCollectionStart,
  fetchCollectionError,
  fetchCollectionSuccess,
} from './reducers'
import TMDB from '../../api'

export function* fetchCollection({ meta: { collectionId } }: RequestCollectionAction) {
  yield put(fetchCollectionStart())

  let collection: Collection | null

  try {
    collection = yield call(TMDB.fetchMovieCollection, collectionId)
  } catch (err) {
    yield put(fetchCollectionError())
    return
  }

  if (collection === null) {
    yield put(fetchCollectionSuccess(null, collectionId))
    return
  }

  const newMovies: ShortMedia[] = yield call(filterExistingMedia, collection.parts, 'shortMovies')
  const payload = {
    ...collection,
    parts: collection.parts.map(({ id }) => id),
  }

  yield put(addShortMovies(newMovies))
  yield put(fetchCollectionSuccess(payload, collectionId))
}

export function* requestCollectionWatcher() {
  yield takeLatest(REQUEST_COLLECTION, fetchCollection)
}
