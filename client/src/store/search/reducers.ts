import { SearchTypes } from './constants';
import { SearchActionTypes } from './actions';
import { ShowShowcase } from '../shows/interfaces';
import { PersonSummary } from '../persons/interfaces';
import { MovieShowcase } from '../movies/interfaces';

interface SearchState {
  movies: MovieShowcase[];
  shows: ShowShowcase[];
  persons: PersonSummary[];
  page: number;
  total_pages: number;
  total_results: number;
  loading: boolean;
  error: boolean;
}

const initialState: SearchState = {
  movies: [],
  shows: [],
  persons: [],
  page: 0,
  total_pages: 0,
  total_results: 0,
  loading: false,
  error: false,
};

const searchReducer = (
  state = initialState,
  action: SearchActionTypes
): SearchState => {
  switch (action.type) {
    case SearchTypes.FETCH_SEARCH_RESULTS_START:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case SearchTypes.FETCH_SEARCH_RESULTS_SUCCESS: {
      const {
        page,
        movies,
        shows,
        persons,
        total_pages,
        total_results,
      } = action.payload;

      return {
        ...state,
        movies: [...state.movies, ...movies],
        shows: [...state.shows, ...shows],
        persons: [...state.persons, ...persons],
        page,
        total_pages,
        total_results,
        loading: false,
        error: false,
      };
    }
    case SearchTypes.FETCH_SEARCH_RESULTS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case SearchTypes.INIT_SEARCH_STATE:
      return initialState;
    default:
      return state;
  }
};

export default searchReducer;
