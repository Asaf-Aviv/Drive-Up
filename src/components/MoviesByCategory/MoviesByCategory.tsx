import React, { useEffect, useContext } from 'react'
import { useDispatch } from 'react-redux'
import capitalize from 'lodash.capitalize'
import {
  MediaCard,
  Container,
  InfiniteMediaList,
  MediaGrid,
  PosterLink,
  Title,
} from 'components'
import { WindowWidthContext } from 'components/WindowWidthProvider'
import { useParams } from 'react-router-dom'
import {
  selectMoviesByCategory,
  clearMoviesByCategory,
  requestMoviesByCategory,
} from 'store/moviesByCategory/reducers'
import { useShallowEqualSelector } from 'hooks'

const MoviesByCategory = () => {
  const { category } = useParams<{ category: string }>()
  const dispatch = useDispatch()
  const movies = useShallowEqualSelector(selectMoviesByCategory)
  const { page, isLastPage, error, loading } = useShallowEqualSelector(
    state => state.moviesByCategory,
  )

  const fetchNextPage = () => {
    dispatch(requestMoviesByCategory(category, page + 1))
  }

  useEffect(() => {
    dispatch(clearMoviesByCategory())
    dispatch(requestMoviesByCategory(category, 1))
  }, [category, dispatch])

  const windowWidth = useContext(WindowWidthContext)

  const title = category
    .split('_')
    .map(capitalize)
    .join(' ')

  return (
    <Container>
      <main>
        <Title>{title} Movies</Title>
        <InfiniteMediaList
          isLastPage={isLastPage}
          fetchNextPage={fetchNextPage}
          loading={loading}
          error={error}
          as="div"
        >
          <MediaGrid as="section">
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
              ),)}
          </MediaGrid>
        </InfiniteMediaList>
      </main>
    </Container>
  )
}

export default MoviesByCategory
