import { SearchTypes } from './constants';
import { MovieShowcase } from '../movies/interfaces';
import { ShowShowcase } from '../shows/interfaces';
import { PersonSummary } from '../persons/interfaces';

type Category = 'multi' | 'movie' | 'tv' | 'person';

export interface RequestSearchResultsAction {
  type: typeof SearchTypes.REQUEST_SEARCH_RESULTS;
  category: Category;
  params: object;
  page: number;
}

interface Payload {
  movies: MovieShowcase[];
  shows: ShowShowcase[];
  persons: PersonSummary[];
  page: number;
  total_pages: number;
  total_results: number;
}

interface FetchSearchResultstartAction {
  type: typeof SearchTypes.FETCH_SEARCH_RESULTS_START;
}

interface FetchSearchResultsSuccessAction {
  type: typeof SearchTypes.FETCH_SEARCH_RESULTS_SUCCESS;
  payload: Payload;
}

interface FetchSearchResultsErrorAction {
  type: typeof SearchTypes.FETCH_SEARCH_RESULTS_ERROR;
}

interface InitSearchState {
  type: typeof SearchTypes.INIT_SEARCH_STATE;
}

export type SearchActionTypes =
  | RequestSearchResultsAction
  | FetchSearchResultstartAction
  | FetchSearchResultsSuccessAction
  | FetchSearchResultsErrorAction
  | InitSearchState;

export const requestSearchResults = (
  category: Category,
  params: object,
  page: number
): SearchActionTypes => ({
  type: SearchTypes.REQUEST_SEARCH_RESULTS,
  category,
  params,
  page,
});

export const fetchSearchResultsStart = (): SearchActionTypes => ({
  type: SearchTypes.FETCH_SEARCH_RESULTS_START,
});

export const fetchSearchResultsSuccess = (
  payload: Payload
): SearchActionTypes => ({
  type: SearchTypes.FETCH_SEARCH_RESULTS_SUCCESS,
  payload,
});

export const fetchSearchResultsError = (): SearchActionTypes => ({
  type: SearchTypes.FETCH_SEARCH_RESULTS_ERROR,
});

export const initSearchState = (): SearchActionTypes => ({
  type: SearchTypes.INIT_SEARCH_STATE,
});
