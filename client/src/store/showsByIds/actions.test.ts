import { Show } from './interfaces';
import {
  requestShowById,
  fetchShowByIdStart,
  fetchShowByIdError,
  fetchShowByIdSuccess,
} from './actions';
import { ShowsByIdsTypes } from './constants';

describe('show by id actions', () => {
  it('should create an action to request a show by id', () => {
    const expectedAction = {
      type: ShowsByIdsTypes.REQUEST_SHOW_BY_ID,
      showId: 3,
    };

    expect(requestShowById(3)).toEqual(expectedAction);
    expectedAction.showId = 5;
    expect(requestShowById(5)).toEqual(expectedAction);
  });

  it('should create an action to start fetch a show by id', () => {
    const expectedAction = {
      type: ShowsByIdsTypes.FETCH_SHOW_BY_ID_START,
    };

    expect(fetchShowByIdStart()).toEqual(expectedAction);
  });

  it('should create an action for successfully fetching a show by id', () => {
    const show = { id: 5 } as Show;

    const expectedAction = {
      type: ShowsByIdsTypes.FETCH_SHOW_BY_ID_SUCCESS,
      show,
    };

    expect(fetchShowByIdSuccess(show)).toEqual(expectedAction);
  });

  it('should create an action for error fetching a show', () => {
    const expectedAction = {
      type: ShowsByIdsTypes.FETCH_SHOW_BY_ID_ERROR,
    };

    expect(fetchShowByIdError()).toEqual(expectedAction);
  });
});
