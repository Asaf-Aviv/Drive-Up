import { ShowShowcase } from './interfaces';
import { ShowsTypes } from './constants';

export interface RequestShowsAction {
  type: typeof ShowsTypes.REQUEST_SHOWS;
  page: number;
}

interface FetchShowsStartAction {
  type: typeof ShowsTypes.FETCH_SHOWS_START;
}

interface FetchShowsSuccessAction {
  type: typeof ShowsTypes.FETCH_SHOWS_SUCCESS;
  shows: ShowShowcase[];
  page: number;
}

interface FetchShowsError {
  type: typeof ShowsTypes.FETCH_SHOWS_ERROR;
}

export type ShowsActionTypes =
  | RequestShowsAction
  | FetchShowsStartAction
  | FetchShowsSuccessAction
  | FetchShowsError

export const requestShows = (page: number): ShowsActionTypes => ({
  type: ShowsTypes.REQUEST_SHOWS,
  page,
});

export const fetchShowsStart = (): ShowsActionTypes => ({
  type: ShowsTypes.FETCH_SHOWS_START,
});

export const fetchShowsSuccess = (shows: ShowShowcase[], page: number): ShowsActionTypes => ({
  type: ShowsTypes.FETCH_SHOWS_SUCCESS,
  shows,
  page,
});

export const fetchShowsError = (): ShowsActionTypes => ({
  type: ShowsTypes.FETCH_SHOWS_ERROR,
});
