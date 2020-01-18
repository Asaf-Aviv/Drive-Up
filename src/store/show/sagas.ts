import { FullShow } from 'store/types'
import filterExistingMedia from 'store/helpers/filterExistingMedia'
import { call, put, takeLatest } from 'redux-saga/effects'
import { addShortShows } from '../shortShowsByIds/reducers'
import { addFullShow } from '../fullShowsByIds/reducers'
import {
  REQUEST_SHOW_BY_ID,
  fetchShowByIdStart,
  fetchShowByIdSuccess,
  fetchShowByIdError,
  RequestShowByIdAction,
} from './reducers'
import TMDB from '../../api'

function* fetchShowById({ meta: { showId } }: RequestShowByIdAction) {
  yield put(fetchShowByIdStart())

  let show: FullShow | null

  try {
    show = yield call(TMDB.fetchShowById, showId)
  } catch (err) {
    yield put(fetchShowByIdError())
    return
  }

  if (!show) {
    yield put(addFullShow(null, showId))
    yield put(fetchShowByIdSuccess())
    return
  }

  const similar = show.similar.results
  const recommendations = show.recommendations.results
  const newShows = yield call(
    filterExistingMedia,
    similar.concat(recommendations),
    'shortShows',
  )

  const payload = {
    ...show,
    similar: {
      ...show.similar,
      results: show.similar.results.map(({ id }) => id),
    },
    recommendations: {
      ...show.recommendations,
      results: show.recommendations.results.map(({ id }) => id),
    },
  }

  yield put(addShortShows(newShows))
  yield put(addFullShow(payload, showId))
  yield put(fetchShowByIdSuccess())
}

export function* requestShowWatcher() {
  yield takeLatest(REQUEST_SHOW_BY_ID, fetchShowById)
}
