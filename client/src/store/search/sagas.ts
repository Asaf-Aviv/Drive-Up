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
  initSearchState,
} from './actions';
import { SearchTypes } from './constants';
import TMDB from '../../api';
import { SearchResults } from './interfaces';

const put = <A extends SearchActionTypes>(action: A): PutEffect<A> =>
  untypedPut(action);

export function* fetchSearchResults(action: RequestSearchResultsAction) {
  const { category, page, params } = action;

  if (page === 1) {
    yield put(initSearchState());
  }

  yield put(fetchSearchResultsStart());

  let data;

  try {
    const res = yield call(TMDB.search, category, params, page);
    data = res.data;
  } catch (err) {
    yield put(fetchSearchResultsError());
    return;
  }

  const { results, ...metaData } = data;

  const payload = Object.assign(metaData, { movies: [], shows: [], persons: [] });

  const mapper = {
    movie: 'movies',
    tv: 'shows',
    person: 'persons',
  };

  category === 'multi'
    // multi search can return an array of mixed results(movies/shows/persons)
    ? results.forEach(({ media_type, ...item }: SearchResults) => {
      payload[mapper[media_type]].push(item);
    })
    : payload[mapper[category]] = results;

  yield put(fetchSearchResultsSuccess(payload));
}

export function* requestSearchResultsWatcher() {
  yield takeLatest(SearchTypes.REQUEST_SEARCH_RESULTS, fetchSearchResults);
}
