import { ShortMedia } from 'store/types'
import { select } from 'redux-saga/effects'

function* filterExistingMedia(
  resources: ShortMedia[],
  reducerName: 'shortMovies' | 'shortShows',
) {
  const existingMedias = yield select(state => state[reducerName])
  return resources.filter(({ id }) => !(id in existingMedias))
}

export default filterExistingMedia
