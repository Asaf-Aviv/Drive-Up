import produce from 'immer'
import addByIdReducer from 'store/helpers/addByIdReducer'
import { RootState } from 'store'
import { ShortMedia } from 'store/types'

const ADD_SHORT_MOVIES = 'ADD_SHORT_MOVIES'

type AddMoviesAction = {
  type: typeof ADD_SHORT_MOVIES
  payload: ShortMedia[]
}

type ShortMoviesState = Record<string, ShortMedia>

export const addShortMovies = (payload: ShortMedia[]): AddMoviesAction => ({
  type: ADD_SHORT_MOVIES,
  payload,
})

const shortMoviesReducer = (
  state: ShortMoviesState = {},
  action: AddMoviesAction,
) => produce(state, (draft) => {
  switch (action.type) {
    case ADD_SHORT_MOVIES:
      addByIdReducer(draft, action.payload)
  }
})

export const selectShortMovie = (id: string) =>
  (state: RootState) => state.shortMovies[id]

export const selectShortMovies = (ids: string[]) =>
  (state: RootState): ShortMedia[] => ids.map(id => state.shortMovies[id])

export default shortMoviesReducer
