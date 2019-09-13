import { MoviesByIdsTypes } from './constants';
import { MoviesByIdActionTypes } from './actions';
import { Movie } from './interfaces';

interface MoviesByIdsState {
  movies: {
    [movieId: number]: Movie;
  };
  loading: boolean;
  error: boolean;
}

export const initialState: MoviesByIdsState = {
  movies: {},
  loading: false,
  error: false,
};

export default function moviesByIdsReducer(
  state = initialState,
  action: MoviesByIdActionTypes
): MoviesByIdsState {
  switch (action.type) {
    case MoviesByIdsTypes.FETCH_MOVIE_BY_ID_START:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case MoviesByIdsTypes.FETCH_MOVIE_BY_ID_SUCCESS:
      return {
        ...state,
        movies: {
          ...state.movies,
          [action.movie.id]: action.movie,
        },
        loading: false,
        error: false,
      };
    case MoviesByIdsTypes.FETCH_MOVIE_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
}
