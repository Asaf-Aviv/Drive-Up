import { ShowShowcase, Show } from './interfaces';
import { ShowsTypes } from './constants';
import { GeneralResult, RelatedFields } from '../movies/actions';

export interface RequestShowsByQueryAction {
  type: typeof ShowsTypes.REQUEST_SHOWS_BY_QUERY;
  params: any;
  page: number;
}

interface FetchShowsByQueryStartAction {
  type: typeof ShowsTypes.FETCH_SHOWS_BY_QUERY_START;
}

interface FetchShowsByQuerySuccessAction {
  type: typeof ShowsTypes.FETCH_SHOWS_BY_QUERY_SUCCESS;
  payload: GeneralResult<ShowShowcase[]>;
}

interface FetchShowsByQueryErrorAction {
  type: typeof ShowsTypes.FETCH_SHOWS_BY_QUERY_ERROR;
}

interface ClearShowsByQueryAction {
  type: typeof ShowsTypes.CLEAR_SHOWS_BY_QUERY;
}

export interface RequestShowByIdAction {
  type: typeof ShowsTypes.REQUEST_SHOW_BY_ID;
  showId: string;
}

interface FetchShowByIdStartAction {
  type: typeof ShowsTypes.FETCH_SHOW_BY_ID_START;
}

interface FetchShowByIdSuccessAction {
  type: typeof ShowsTypes.FETCH_SHOW_BY_ID_SUCCESS;
  show: Show;
}

interface FetchShowByIdErrorAction {
  type: typeof ShowsTypes.FETCH_SHOW_BY_ID_ERROR;
}

export interface RequestRelatedShowsAction {
  type: typeof ShowsTypes.REQUEST_RELATED_SHOWS;
  showId: number;
  page: number;
  relatedField: RelatedFields;
}

interface FetchRelatedShowsStartAction {
  type: typeof ShowsTypes.FETCH_RELATED_SHOWS_START;
  showId: number;
  relatedField: RelatedFields;
}

interface FetchRelatedShowsSuccessAction {
  type: typeof ShowsTypes.FETCH_RELATED_SHOWS_SUCCESS;
  showId: number;
  relatedField: RelatedFields;
  payload: GeneralResult<ShowShowcase[]>;
}

interface FetchRelatedShowsErrorAction {
  type: typeof ShowsTypes.FETCH_RELATED_SHOWS_ERROR;
  showId: number;
  relatedField: RelatedFields;
}

export interface RequestShowsByCategoryAction {
  type: typeof ShowsTypes.REQUEST_SHOWS_BY_CATEGORY;
  category: string;
  page: number;
}

interface FetchShowsByCategoryStartAction {
  type: typeof ShowsTypes.FETCH_SHOWS_BY_CATEGORY_START;
  category: string;
}

interface FetchShowsByCategorySuccessAction {
  type: typeof ShowsTypes.FETCH_SHOWS_BY_CATEGORY_SUCCESS;
  category: string;
  payload: GeneralResult<ShowShowcase[]>;
}

interface FetchShowsByCategoryErrorAction {
  type: typeof ShowsTypes.FETCH_SHOWS_BY_CATEGORY_ERROR;
  category: string;
}

export type ShowsActionTypes =
  | RequestShowsByQueryAction
  | FetchShowsByQueryStartAction
  | FetchShowsByQuerySuccessAction
  | FetchShowsByQueryErrorAction
  | ClearShowsByQueryAction
  | RequestShowByIdAction
  | FetchShowByIdStartAction
  | FetchShowByIdSuccessAction
  | FetchShowByIdErrorAction
  | RequestRelatedShowsAction
  | FetchRelatedShowsStartAction
  | FetchRelatedShowsSuccessAction
  | FetchRelatedShowsErrorAction
  | RequestShowsByCategoryAction
  | FetchShowsByCategoryStartAction
  | FetchShowsByCategorySuccessAction
  | FetchShowsByCategoryErrorAction

export const requestShowsByQuery = (params: any, page: number): ShowsActionTypes => ({
  type: ShowsTypes.REQUEST_SHOWS_BY_QUERY,
  params,
  page,
});

export const fetchShowsByQueryStart = (): ShowsActionTypes => ({
  type: ShowsTypes.FETCH_SHOWS_BY_QUERY_START,
});

export const fetchShowsByQueryByIdSuccess = (
  payload: GeneralResult<ShowShowcase[]>
): ShowsActionTypes => ({
  type: ShowsTypes.FETCH_SHOWS_BY_QUERY_SUCCESS,
  payload,
});

export const fetchShowsByQueryError = (): ShowsActionTypes => ({
  type: ShowsTypes.FETCH_SHOWS_BY_QUERY_ERROR,
});

export const clearShowsByQuery = (): ShowsActionTypes => ({
  type: ShowsTypes.CLEAR_SHOWS_BY_QUERY,
});

export const requestShowById = (showId: string): ShowsActionTypes => ({
  type: ShowsTypes.REQUEST_SHOW_BY_ID,
  showId,
});

export const fetchShowByIdStart = (): ShowsActionTypes => ({
  type: ShowsTypes.FETCH_SHOW_BY_ID_START,
});

export const fetchShowByIdSuccess = (show: Show): ShowsActionTypes => ({
  type: ShowsTypes.FETCH_SHOW_BY_ID_SUCCESS,
  show,
});

export const fetchShowByIdError = (): ShowsActionTypes => ({
  type: ShowsTypes.FETCH_SHOW_BY_ID_ERROR,
});

export const requestRelatedShows = (
  showId: number,
  relatedField: RelatedFields,
  page: number
): ShowsActionTypes => ({
  type: ShowsTypes.REQUEST_RELATED_SHOWS,
  showId,
  relatedField,
  page,
});

export const fetchRelatedShowsStart = (
  showId: number,
  relatedField: RelatedFields
): ShowsActionTypes => ({
  type: ShowsTypes.FETCH_RELATED_SHOWS_START,
  showId,
  relatedField,
});

export const fetchRelatedShowsSuccess = (
  showId: number,
  relatedField: RelatedFields,
  payload: GeneralResult<ShowShowcase[]>,
): ShowsActionTypes => ({
  type: ShowsTypes.FETCH_RELATED_SHOWS_SUCCESS,
  showId,
  relatedField,
  payload,
});

export const fetchRelatedShowsError = (
  showId: number,
  relatedField: RelatedFields
): ShowsActionTypes => ({
  type: ShowsTypes.FETCH_RELATED_SHOWS_ERROR,
  showId,
  relatedField,
});


export const requestShowsByCategory = (
  category: string,
  page: number
): ShowsActionTypes => ({
  type: ShowsTypes.REQUEST_SHOWS_BY_CATEGORY,
  category,
  page,
});

export const fetchShowsByCategoryStart = (category: string): ShowsActionTypes => ({
  type: ShowsTypes.FETCH_SHOWS_BY_CATEGORY_START,
  category,
});

export const fetchShowsByCategorySuccess = (
  category: string,
  payload: GeneralResult<ShowShowcase[]>,
): ShowsActionTypes => ({
  type: ShowsTypes.FETCH_SHOWS_BY_CATEGORY_SUCCESS,
  category,
  payload,
});

export const fetchShowsByCategoryError = (category: string): ShowsActionTypes => ({
  type: ShowsTypes.FETCH_SHOWS_BY_CATEGORY_ERROR,
  category,
});
