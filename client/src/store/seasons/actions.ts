import { SeasonsTypes } from './constants';
import { Season } from './interfaces';

export interface RequestSeasonAction {
  type: typeof SeasonsTypes.REQUEST_SEASON;
  showId: number;
  seasonNumber: number;
}

interface FetchSeasonStartAction {
  type: typeof SeasonsTypes.FETCH_SEASON_START;
}

interface FetchSeasonSuccessAction {
  type: typeof SeasonsTypes.FETCH_SEASON_SUCCESS;
  payload: {
    showId: number;
    seasonNumber: number;
    season: Season;
  };
}

interface FetchSeasonErrorAction {
  type: typeof SeasonsTypes.FETCH_SEASON_ERROR;
}

export type SeasonsActionTypes =
  | RequestSeasonAction
  | FetchSeasonStartAction
  | FetchSeasonSuccessAction
  | FetchSeasonErrorAction;

export const requestSeason = (
  showId: number,
  seasonNumber: number
): SeasonsActionTypes => ({
  type: SeasonsTypes.REQUEST_SEASON,
  showId,
  seasonNumber,
});

export const fetchSeasonStart = (): SeasonsActionTypes => ({
  type: SeasonsTypes.FETCH_SEASON_START,
});

export const fetchSeasonSuccess = (payload: {
  showId: number;
  seasonNumber: number;
  season: Season;
}): SeasonsActionTypes => ({
  type: SeasonsTypes.FETCH_SEASON_SUCCESS,
  payload,
});

export const fetchSeasonError = (): SeasonsActionTypes => ({
  type: SeasonsTypes.FETCH_SEASON_ERROR,
});
