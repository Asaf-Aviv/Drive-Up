import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  selectWeeklyTrendingShows,
  requestTrendings,
} from 'store/trending/reducers'
import {
  BackDrop,
  SlideShow,
  SectionTitle,
  Loader,
  ErrorMessageWithRetry,
} from 'components'
import { useShallowEqualSelector } from 'hooks'

const WeeklyTrendingShows = () => {
  const dispatch = useDispatch()
  const shows = useShallowEqualSelector(selectWeeklyTrendingShows)
  const loading = useShallowEqualSelector(
    ({ trending }) => trending.weeklyTrendingShows.loading,
  )
  const error = useShallowEqualSelector(
    ({ trending }) => trending.weeklyTrendingShows.error,
  )

  const requestShows = () => {
    dispatch(requestTrendings('weeklyTrendingShows'))
  }

  useEffect(() => {
    requestShows()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <SectionTitle>Trending Shows This Week</SectionTitle>
      {loading && <Loader withContainer />}
      {error && (
        <ErrorMessageWithRetry mediaType="weekly trending shows" retry={requestShows} />
      )}
      {shows && (
        <SlideShow>
          {shows.map(show => (
            <Link key={show.id} to={`/show/${show.id}`}>
              <BackDrop imgPath={show.backdrop} alt={show.name} withCaption />
            </Link>
          ))}
        </SlideShow>
      )}
    </>
  )
}

export default WeeklyTrendingShows
