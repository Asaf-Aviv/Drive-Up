import produce from 'immer'
import { RootState } from 'store'
import { selectShortMovies } from '../shortMoviesByIds/reducers'
import { SelectedFullMovie, FullMovieInStore } from '../types'
import addByIdReducer from '../helpers/addByIdReducer'

const ADD_FULL_MOVIE = 'ADD_FULL_MOVIE'

type AddMovieAction = {
  type: typeof ADD_FULL_MOVIE
  payload: FullMovieInStore | null
  meta: {
    movieId: string
  }
}

export const addFullMovie = (
  payload: FullMovieInStore | null,
  movieId: string,
): AddMovieAction => ({
  type: ADD_FULL_MOVIE,
  payload,
  meta: {
    movieId,
  },
})

type MoviesState = Record<string, FullMovieInStore | null>

const fullMoviesReducer = (
  state: MoviesState = {},
  action: AddMovieAction,
) => produce(state, (draft) => {
  switch (action.type) {
    case ADD_FULL_MOVIE:
      addByIdReducer(draft, action.payload, action.meta.movieId)
  }
})

export const selectMovieById = (id: string) => (
  state: RootState,
): SelectedFullMovie | null => {
  if (!(id in state.fullMovies)) return
  const movie = state.fullMovies[id]
  if (movie === null) return null

  return {
    ...movie,
    similar: {
      ...movie.similar,
      results: selectShortMovies(movie.similar.results)(state),
    },
    recommendations: {
      ...movie.recommendations,
      results: selectShortMovies(movie.recommendations.results)(state),
    },
  }
}

export default fullMoviesReducer
