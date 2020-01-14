import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  selectWeeklyTrendingMovies,
  requestTrendings,
} from 'store/trending/reducers'
import {
  BackDrop,
  SlideShow,
  SectionTitle,
  Spacer,
  Loader,
  ErrorMessageWithRetry,
} from 'components'
import { useShallowEqualSelector } from 'hooks'

const WeeklyTrendingMovies = () => {
  const dispatch = useDispatch()
  const movies = useShallowEqualSelector(selectWeeklyTrendingMovies)
  const loading = useShallowEqualSelector(
    ({ trending }) => trending.weeklyTrendingMovies.loading,
  )
  const error = useShallowEqualSelector(
    ({ trending }) => trending.weeklyTrendingMovies.error,
  )

  const requestMovies = () => {
    dispatch(requestTrendings('weeklyTrendingMovies'))
  }

  useEffect(() => {
    requestMovies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <SectionTitle>Trending Movies This Week</SectionTitle>
      {loading && <Loader withContainer />}
      {error && (
        <ErrorMessageWithRetry mediaType="weekly trending movies" retry={requestMovies} />
      )}
      {movies && (
        <>
          <SlideShow>
            {movies.map(movie => (
              <Link key={movie.id} to={`/movie/${movie.id}`}>
                <BackDrop
                  imgPath={movie.backdrop}
                  alt={movie.name}
                  withCaption
                />
              </Link>
            ))}
          </SlideShow>
          <Spacer />
        </>
      )}
    </>
  )
}

export default WeeklyTrendingMovies
