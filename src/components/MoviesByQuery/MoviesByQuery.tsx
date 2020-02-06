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
import { useShallowEqualSelector } from 'hooks'
import {
  InfiniteMediaList,
  MediaCard,
  Container,
  MediaGrid,
  PosterLink,
  Title,
} from 'components'
import { Helmet } from 'react-helmet'

const MoviesByQuery = () => {
  const movies = useShallowEqualSelector(selectMoviesByQuery)
  const { page, loading, error, isLastPage } = useShallowEqualSelector(
    state => state.moviesByQuery,
  )
  const dispatch = useDispatch()
  const { search } = useLocation()
  const windowWidth = useContext(WindowWidthContext)

  const getParams = useCallback(() => qs.parse(search, { ignoreQueryPrefix: true }), [
    search,
  ])

  useEffect(() => {
    dispatch(clearMoviesByQuery())
    dispatch(requestMoviesByQuery(getParams(), 1))
  }, [dispatch, getParams])

  const fetchNextPage = () => {
    dispatch(requestMoviesByQuery(getParams(), page + 1))
  }

  return (
    <Container>
      <Helmet>
        <title>Movies - Drive Up</title>
        <meta name="description" content="Movies list" />
      </Helmet>
      <main>
        <Title>Movies</Title>
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
