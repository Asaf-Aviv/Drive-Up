import { ShowShowcase } from './interfaces';
import {
  requestShows,
  fetchShowsStart,
  fetchShowsSuccess,
  fetchShowsError,
} from './actions';

describe('shows actions', () => {
  it('should create an action to request shows', () => {
    const expectedAction = {
      type: 'REQUEST_SHOWS',
      page: 1,
    };

    expect(requestShows(1)).toEqual(expectedAction);
  });

  it('should create an action to request shows with page based of parameter', () => {
    const expectedAction = {
      type: 'REQUEST_SHOWS',
      page: 3,
    };

    expect(requestShows(3)).toEqual(expectedAction);
    expectedAction.page = 5;
    expect(requestShows(5)).toEqual(expectedAction);
  });

  it('should create an action to start fetching shows', () => {
    const expectedAction = {
      type: 'FETCH_SHOWS_START',
    };

    expect(fetchShowsStart()).toEqual(expectedAction);
  });

  it('should create an action for successfully fetching shows', () => {
    const page = 3;
    const shows: ShowShowcase[] = [];

    const expectedAction = {
      type: 'FETCH_SHOWS_SUCCESS',
      shows,
      page,
    };

    expect(fetchShowsSuccess(shows, page)).toEqual(expectedAction);
  });

  it('should create an action for error fetching shows', () => {
    const expectedAction = {
      type: 'FETCH_SHOWS_ERROR',
    };

    expect(fetchShowsError()).toEqual(expectedAction);
  });
});
