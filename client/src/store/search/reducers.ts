import { SearchTypes } from './constants';

const initialState = {
  results: [],
  page: 1,
  total_pages: 0,
  total_results: 0,
  loading: false,
  error: false,
};

const searchReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SearchTypes.FETCH_SEARCH_RESULTS_START:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case SearchTypes.FETCH_SEARCH_RESULTS_SUCCESS: {
      const {
        page, results, total_pages, total_results,
      } = action.payload;

      return {
        ...state,
        results: [...state.results, ...results],
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
    default:
      return state;
  }
};

export default searchReducer;
