import { fork } from 'redux-saga/effects'
import { requestSearchResultsWatcher } from '../search/sagas'
import { requestTrendingsWatcher } from '../trending/sagas'
import { requestMoviesByQueryWatcher } from '../moviesByQuery/sagas'
import { requestShowsByQueryWatcher } from '../showsByQuery/sagas'
import { requestPersonsByQueryWatcher } from '../personsByQuery/sagas'
import { requestMoviesByCategoryWatcher } from '../moviesByCategory/sagas'
import { requestShowsByCategoryWatcher } from '../showsByCategory/sagas'
import { requestMovieWatcher } from '../movie/sagas'
import { requestShowWatcher } from '../show/sagas'
import { requestPersonWatcher } from '../person/sagas'
import { requestShowSeasonWatcher } from '../showSeasons/sagas'

export default function* rootSaga() {
  yield fork(requestTrendingsWatcher)
  yield fork(requestMoviesByQueryWatcher)
  yield fork(requestShowsByQueryWatcher)
  yield fork(requestPersonsByQueryWatcher)
  yield fork(requestMoviesByCategoryWatcher)
  yield fork(requestShowsByCategoryWatcher)
  yield fork(requestSearchResultsWatcher)
  yield fork(requestMovieWatcher)
  yield fork(requestShowWatcher)
  yield fork(requestPersonWatcher)
  yield fork(requestShowSeasonWatcher)
}
