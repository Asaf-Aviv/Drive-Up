import {
  put as untypedPut,
  call,
  PutEffect,
  takeLatest,
  delay,
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

export function* fetchSearchResults({
  category,
  page,
  params,
}: RequestSearchResultsAction) {
  if (page === 1) {
    // debounce only on a new query filters
    yield delay(500);
    yield put(initSearchState());
  }

  const mapper = {
    movie: 'movies',
    tv: 'shows',
    person: 'persons',
  };

  try {
    yield put(fetchSearchResultsStart());
    const { data: { results, ...metaData } } = yield call(TMDB.search, category, params, page);

    const payload = Object.assign(metaData, { movies: [], shows: [], persons: [] });

    category === 'multi'
      // multi search can return an array of mixed movies/shows/persons
      ? results.forEach(({ media_type, ...item }: SearchResults) => {
        payload[mapper[media_type]].push(item);
      })
      : payload[mapper[category]] = results;

    yield put(fetchSearchResultsSuccess(payload));
  } catch (error) {
    yield put(fetchSearchResultsError());
  }
}

export function* requestSearchResultsWatcher() {
  yield takeLatest(SearchTypes.REQUEST_SEARCH_RESULTS, fetchSearchResults);
}
