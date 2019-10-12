import {
  put as untypedPut,
  call,
  PutEffect,
  takeLatest,
} from 'redux-saga/effects';
import {
  RequestSearchResultsAction,
  fetchSearchResultsStart,
  fetchSearchResultsError,
  SearchActionTypes,
  fetchSearchResultsSuccess,
} from './actions';
import { SearchTypes } from './constants';
import TMDB from '../../api';

const put = <A extends SearchActionTypes>(action: A): PutEffect<A> =>
  untypedPut(action);

export function* fetchSearchResults({
  category,
  page,
  params,
}: RequestSearchResultsAction) {
  try {
    yield put(fetchSearchResultsStart());
    const res = yield call(TMDB.search, category, params, page);
    yield put(fetchSearchResultsSuccess(res.data));
  } catch (error) {
    yield put(fetchSearchResultsError());
  }
}

export function* requestSearchResultsWatcher() {
  yield takeLatest(SearchTypes.REQUEST_SEARCH_RESULTS, fetchSearchResults);
}
