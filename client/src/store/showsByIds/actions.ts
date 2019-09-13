import { ShowsByIdsTypes } from './constants';
import { Show } from './interfaces';

export interface RequestShowByIdAction {
  type: typeof ShowsByIdsTypes.REQUEST_SHOW_BY_ID;
  showId: number;
}

interface FetchShowByIdStartAction {
  type: typeof ShowsByIdsTypes.FETCH_SHOW_BY_ID_START;
}

interface FetchShowByIdSuccessAction {
  type: typeof ShowsByIdsTypes.FETCH_SHOW_BY_ID_SUCCESS;
  show: Show;
}

interface FetchShowByIdErrorAction {
  type: typeof ShowsByIdsTypes.FETCH_SHOW_BY_ID_ERROR;
}

export type ShowsByIdActionTypes =
  | RequestShowByIdAction
  | FetchShowByIdStartAction
  | FetchShowByIdSuccessAction
  | FetchShowByIdErrorAction

export const requestShowById = (showId: number): ShowsByIdActionTypes => ({
  type: ShowsByIdsTypes.REQUEST_SHOW_BY_ID,
  showId,
});

export const fetchShowByIdStart = (): ShowsByIdActionTypes => ({
  type: ShowsByIdsTypes.FETCH_SHOW_BY_ID_START,
});

export const fetchShowByIdSuccess = (show: Show): ShowsByIdActionTypes => ({
  type: ShowsByIdsTypes.FETCH_SHOW_BY_ID_SUCCESS,
  show,
});

export const fetchShowByIdError = (): ShowsByIdActionTypes => ({
  type: ShowsByIdsTypes.FETCH_SHOW_BY_ID_ERROR,
});
