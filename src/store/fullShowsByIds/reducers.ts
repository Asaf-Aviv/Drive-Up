import produce from 'immer'
import { RootState } from 'store'
import { addByIdReducer } from 'store/helpers'
import { FullShowInStore } from 'store/types'
import { selectShortShows } from '../shortShowsByIds/reducers'
import { SelectedFullShow } from '../types'

const ADD_FULL_SHOW = 'ADD_FULL_SHOW'

type AddShowAction = {
  type: typeof ADD_FULL_SHOW
  payload: FullShowInStore | null
  meta: {
    showId: string
  }
}

export const addFullShow = (
  payload: FullShowInStore | null,
  showId: string,
): AddShowAction => ({
  type: ADD_FULL_SHOW,
  payload,
  meta: {
    showId,
  },
})

type ShowsState = Record<string, FullShowInStore | null>

const fullShowsReducer = (
  state: ShowsState = {},
  action: AddShowAction,
) => produce(state, (draft) => {
  switch (action.type) {
    case ADD_FULL_SHOW:
      addByIdReducer(draft, action.payload, action.meta.showId)
  }
})

export const selectShowById = (id: string) => (
  state: RootState,
): SelectedFullShow | null => {
  if (!(id in state.fullShows)) return
  const show = state.fullShows[id]
  if (!show) return null

  return {
    ...show,
    similar: {
      ...show.similar,
      results: selectShortShows(show.similar.results)(state),
    },
    recommendations: {
      ...show.recommendations,
      results: selectShortShows(show.recommendations.results)(state),
    },
  }
}

export default fullShowsReducer