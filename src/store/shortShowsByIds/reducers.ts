import produce from 'immer'
import addByIdReducer from 'store/helpers/addByIdReducer'
import { RootState } from 'store'
import { Action } from 'store/helpers'
import { ShortMedia } from 'store/types'

export const ADD_SHORT_SHOWS = 'ADD_SHORT_SHOWS'

export type AddShowsAction = Action<
  typeof ADD_SHORT_SHOWS,
  ShortMedia[]
>

type ShortShowsState = Record<string, ShortMedia>

export const addShortShows = (payload: ShortMedia[]): AddShowsAction => ({
  type: ADD_SHORT_SHOWS,
  payload,
})

const shortShowsReducer = (
  state: ShortShowsState = {},
  action: AddShowsAction,
) => produce(state, (draft) => {
  switch (action.type) {
    case ADD_SHORT_SHOWS:
      addByIdReducer(draft, action.payload)
  }
})

export const selectShortShow = (id: string) =>
  (state: RootState) => state.shortShows[id]

export const selectShortShows = (ids: string[]) =>
  (state: RootState) => ids.map(id => state.shortShows[id])

export default shortShowsReducer
