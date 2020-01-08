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
  selectShowsByCategory,
  clearShowsByCategory,
  requestShowsByCategory,
} from 'store/showsByCategory/reducers'
import { useShallowEqualSelector } from 'hooks'

const ShowsByCategory = () => {
  const { category } = useParams<{ category: string }>()
  const dispatch = useDispatch()
  const shows = useShallowEqualSelector(selectShowsByCategory)
  const { page, isLastPage, error, loading } = useShallowEqualSelector(
    state => state.showsByCategory,
  )

  const fetchNextPage = () => {
    dispatch(requestShowsByCategory(category, page + 1))
  }

  useEffect(() => {
    dispatch(clearShowsByCategory())
    dispatch(requestShowsByCategory(category, 1))
  }, [category, dispatch])

  const windowWidth = useContext(WindowWidthContext)

  const title = category
    .split('_')
    .map(capitalize)
    .join(' ')

  return (
    <Container>
      <main>
        <Title>{title} Shows</Title>
        <InfiniteMediaList
          isLastPage={isLastPage}
          fetchNextPage={fetchNextPage}
          loading={loading}
          error={error}
          as="div"
        >
          <MediaGrid as="section">
            {shows.map(show =>
              windowWidth < 900 ? (
                <PosterLink
                  key={show.id}
                  to={`/show/${show.id}`}
                  poster={show.poster}
                  alt={show.name}
                />
              ) : (
                <MediaCard key={show.id} mediaType="show" {...show} />
              ))}
          </MediaGrid>
        </InfiniteMediaList>
      </main>
    </Container>
  )
}

export default ShowsByCategory
