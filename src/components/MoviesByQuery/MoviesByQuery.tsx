import React, { useEffect, useCallback, useContext } from 'react'
import qs from 'qs'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router'
import { WindowWidthContext } from 'components/WindowWidthProvider'
import {
  clearMoviesByQuery,
  requestMoviesByQuery,
  selectMoviesByQuery,
} from 'store/moviesByQuery/reducers'
import { useIsFirstRender, useShallowEqualSelector } from 'hooks'
import {
  InfiniteMediaList,
  MediaCard,
  Container,
  MediaGrid,
  PosterLink,
} from 'components'

const MoviesByQuery = () => {
  const { page, loading, error, isLastPage } = useShallowEqualSelector(
    state => state.moviesByQuery,
  )
  const movies = useShallowEqualSelector(selectMoviesByQuery)
  const dispatch = useDispatch()
  const { search } = useLocation()
  const isFirstRender = useIsFirstRender()
  const windowWidth = useContext(WindowWidthContext)

  const getParams = useCallback(
    () => qs.parse(search, { ignoreQueryPrefix: true }),
    [search],
  )

  useEffect(() => {
    if (isFirstRender) return

    dispatch(clearMoviesByQuery())
    dispatch(requestMoviesByQuery(getParams(), 1))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, getParams])

  useEffect(() => {
    if (isFirstRender && !movies[0]) {
      dispatch(clearMoviesByQuery())
      dispatch(requestMoviesByQuery(getParams(), 1))
    }
  }, [dispatch, getParams, isFirstRender, movies])

  const fetchNextPage = () => {
    dispatch(requestMoviesByQuery(getParams(), page + 1))
  }

  return (
    <Container>
      <main>
        <InfiniteMediaList
          isLastPage={isLastPage}
          fetchNextPage={fetchNextPage}
          loading={loading}
          error={error}
          as="section"
        >
          <MediaGrid as="div">
            {movies.map(movie =>
              windowWidth < 900 ? (
                <PosterLink
                  key={movie.id}
                  to={`/movie/${movie.id}`}
                  poster={movie.poster}
                  alt={movie.name}
                />
              ) : (
                <MediaCard key={movie.id} mediaType="movie" {...movie} />
              ))}
          </MediaGrid>
        </InfiniteMediaList>
      </main>
    </Container>
  )
}

export default MoviesByQuery
