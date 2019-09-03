import { ShowShowcase } from './interfaces';
import {
  ShowsActionTypes,
  fetchShowsStart,
  fetchShowsError,
  fetchShowsSuccess,
} from './actions';
import showsReducer, { initialState } from './reducers';

describe('shows reducer', () => {
  it('should return the initial state', () => {
    expect(
      showsReducer(undefined, {} as ShowsActionTypes)
    ).toEqual(
      initialState
    );
  });

  it('should handle FETCH_SHOWS_START', () => {
    const state = {
      ...initialState,
      loading: false,
      error: true,
    };

    expect(
      showsReducer(state, fetchShowsStart())
    ).toEqual({
      ...initialState,
      loading: true,
      error: false,
    });
  });

  it('should handle FETCH_SHOWS_SUCCESS', () => {
    const state = {
      ...initialState,
      loading: true,
      error: false,
    };

    const firstPage = 3;
    const firstShows = [{ id: 1 }] as ShowShowcase[];

    const firstState = {
      ...initialState,
      shows: firstShows,
      page: firstPage,
      loading: false,
      error: false,
    };

    const secondPage = 4;
    const secondShows = [{ id: 2 }] as ShowShowcase[];

    const secondState = {
      ...firstState,
      shows: firstState.shows.concat(secondShows),
      page: secondPage,
    };

    expect(
      showsReducer(state, fetchShowsSuccess(firstShows, firstPage))
    )
      .toEqual(firstState);

    firstState.loading = true;

    expect(
      showsReducer(firstState, fetchShowsSuccess(secondShows, secondPage))
    )
      .toEqual(secondState);
  });

  it('should handle FETCH_SHOWS_ERROR', () => {
    const state = {
      ...initialState,
      loading: true,
      error: false,
    };

    expect(
      showsReducer(state, fetchShowsError())
    ).toEqual({
      ...initialState,
      loading: false,
      error: true,
    });
  });
});
