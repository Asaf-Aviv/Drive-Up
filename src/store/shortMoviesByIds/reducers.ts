import produce from 'immer'
import addByIdReducer from 'store/helpers/addByIdReducer'
import { RootState } from 'store'
import { Action } from 'store/helpers'
import { ShortMedia } from 'store/types'

export const ADD_SHORT_MOVIES = 'ADD_SHORT_MOVIES'

export type AddMoviesAction = Action<
  typeof ADD_SHORT_MOVIES,
  ShortMedia[]
>

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
