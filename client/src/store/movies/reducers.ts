import { MoviesTypes } from './constants';
import { MoviesActionTypes } from './actions';
import { MovieShowcase } from './interfaces';

interface MoviesState {
  loading: boolean;
  page: number;
  movies: MovieShowcase[];
  error: boolean;
  pagesCount: number;
  moviesCount: number;
}

const initialState: MoviesState = {
  movies: [],
  loading: false,
  error: false,
  page: 1,
  pagesCount: 0,
  moviesCount: 0,
};

export default (
  state = initialState,
  action: MoviesActionTypes
): MoviesState => {
  switch (action.type) {
    case MoviesTypes.FETCH_MOVIES_START:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case MoviesTypes.FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        movies: state.movies.concat(action.movies),
        page: action.page,
        loading: false,
        error: false,
      };
    case MoviesTypes.FETCH_MOVIES_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};
