import axios from 'axios';
import { ThunkAction } from 'redux-thunk';

/* eslint-disable no-multi-spaces */
enum MoviesTypes {
  ADD_MOVIES        = 'ADD_MOVIES',
  SET_RESULTS_COUNT = 'SET_RESULTS_COUNT',
  SET_LOADING       = 'SET_LOADING',
  SET_PAGE          = 'SET_PAGE',
}
/* eslint-enable no-multi-spaces */

export interface MovieShowcase {
  poster_path: string | null;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

interface AddMoviesAction {
  type: typeof MoviesTypes.ADD_MOVIES;
  movies: MovieShowcase[];
}

interface SetResultsCountAction {
  type: typeof MoviesTypes.SET_RESULTS_COUNT;
  payload: {
    moviesCount: number;
    pagesCount: number;
  };
}

interface SetLoadingAction {
  type: typeof MoviesTypes.SET_LOADING;
}

interface SetPage {
  type: typeof MoviesTypes.SET_PAGE;
  page: number;
}

type MoviesActionTypes = (
  | AddMoviesAction
  | SetResultsCountAction
  | SetLoadingAction
  | SetPage
)

const setLoading = (): MoviesActionTypes => ({
  type: MoviesTypes.SET_LOADING,
});

const setPage = (page: number): MoviesActionTypes => ({
  type: MoviesTypes.SET_PAGE,
  page,
});

const addMovies = (movies: MovieShowcase[]): MoviesActionTypes => ({
  type: MoviesTypes.ADD_MOVIES,
  movies,
});

const setResultsCount = (pagesCount: number, moviesCount: number): MoviesActionTypes => ({
  type: MoviesTypes.SET_RESULTS_COUNT,
  payload: {
    pagesCount,
    moviesCount,
  },
}) 

export const fetchInitialMovies = (): ThunkAction<Promise<void>, {}, {}, MoviesActionTypes> => async (dispatch) => {
  try {
    dispatch(setLoading());
    const { data } = await axios('https://api.themoviedb.org/3/discover/movie?page=1');
    const { total_results: moviesCount, total_pages: pagesCount, results: movies, page } = data;
    console.log(data);
    dispatch(setResultsCount(pagesCount, moviesCount));
    dispatch(addMovies(movies));
  } catch (err) {
    console.log(err);
  }
}

export const fetchNextPage = (page: number): ThunkAction<Promise<void>, {}, {}, MoviesActionTypes> => async (dispatch, getState) => {
  try {
    console.log(page)
    dispatch(setLoading());
    const { data: { results: movies } } = await axios(`https://api.themoviedb.org/3/discover/movie?page=${page}`);
    console.log(movies);
    dispatch(setPage(page));
    dispatch(addMovies(movies));
  } catch (err) {
    console.log(err);
  }
}

interface MoviesState {
  loading: boolean;
  page: number;
  movies: MovieShowcase[];
  error: boolean;
  pagesCount: number;
  moviesCount: number;
}

const initialState: MoviesState = {
  loading: false,
  page: 1,
  movies: [],
  error: false,
  pagesCount: 0,
  moviesCount: 0,
};

export default (
  state = initialState,
  action: MoviesActionTypes,
): MoviesState => {
  switch (action.type) {
    case MoviesTypes.SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case MoviesTypes.SET_PAGE:
      return {
        ...state,
        page: action.page,
      };
    case MoviesTypes.SET_RESULTS_COUNT: 
      return {
        ...state,
        ...action.payload,
      };
    case MoviesTypes.ADD_MOVIES:
      return {
        ...state,
        loading: false,
        movies: state.movies.concat(action.movies),
        error: false,
      };
    default:
      return state;
  }
};
