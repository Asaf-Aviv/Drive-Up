import {
  fetchShowByIdError, ShowsByIdActionTypes, fetchShowByIdStart, fetchShowByIdSuccess,
} from './actions';
import showsByIdsReducer, { initialState } from './reducers';
import { Show } from './interfaces';

describe('showsByIds reducer', () => {
  it('should return the initial state', () => {
    expect(
      showsByIdsReducer(undefined, {} as ShowsByIdActionTypes)
    ).toEqual(initialState);
  });

  it('should handle FETCH_PERSON_BY_ID_START', () => {
    const state = {
      ...initialState,
      loading: false,
      error: true,
    };

    expect(showsByIdsReducer(state, fetchShowByIdStart())).toEqual({
      ...initialState,
      loading: true,
      error: false,
    });
  });

  it('should handle FETCShow_BY_ID_SUCCESS', () => {
    const state = {
      ...initialState,
      loading: true,
      error: false,
    };

    const firstShow = { id: 3 } as Show;
    const secondShow = { id: 5 } as Show;

    const firstState = {
      ...initialState,
      shows: {
        [firstShow.id]: firstShow,
      },
      loading: false,
      error: false,
    };

    const secondState = {
      ...firstState,
      shows: {
        ...firstState.shows,
        [secondShow.id]: secondShow,
      },
    };

    expect(
      showsByIdsReducer(state, fetchShowByIdSuccess(firstShow))
    ).toEqual(firstState);

    firstState.loading = true;

    expect(
      showsByIdsReducer(firstState, fetchShowByIdSuccess(secondShow))
    ).toEqual(secondState);
  });

  it('should handle FETCH_SHOW_BY_ID_ERROR', () => {
    const state = {
      ...initialState,
      loading: true,
      error: false,
    };

    expect(showsByIdsReducer(state, fetchShowByIdError())).toEqual({
      ...initialState,
      loading: false,
      error: true,
    });
  });
});
