import { SearchTypes } from './constants';

type Category = 'multi' | 'movie' | 'show' | 'person'

export interface RequestSearchResultsAction {
  type: typeof SearchTypes.REQUEST_SEARCH_RESULTS;
  category: Category;
  params: object;
  page: number;
}

interface FetchSearchResultstartAction {
  type: typeof SearchTypes.FETCH_SEARCH_RESULTS_START;
}

interface FetchSearchResultsSuccessAction {
  type: typeof SearchTypes.FETCH_SEARCH_RESULTS_SUCCESS;
  payload: any;
}

interface FetchSearchResultsErrorAction {
  type: typeof SearchTypes.FETCH_SEARCH_RESULTS_ERROR;
}

export type SearchActionTypes =
  | RequestSearchResultsAction
  | FetchSearchResultstartAction
  | FetchSearchResultsSuccessAction
  | FetchSearchResultsErrorAction;

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
  payload: any
): SearchActionTypes => ({
  type: SearchTypes.FETCH_SEARCH_RESULTS_SUCCESS,
  payload,
});

export const fetchSearchResultsError = (): SearchActionTypes => ({
  type: SearchTypes.FETCH_SEARCH_RESULTS_ERROR,
});
