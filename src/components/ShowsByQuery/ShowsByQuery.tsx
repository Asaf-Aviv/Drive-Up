import React, { useEffect, useCallback, useContext } from 'react'
import qs from 'qs'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router'
import { WindowWidthContext } from 'components/WindowWidthProvider'
import {
  PosterLink,
  MediaGrid,
  MediaCard,
  InfiniteMediaList,
  Title,
  Container,
} from 'components'
import {
  selectShowsByQuery,
  requestShowsByQuery,
  clearShowsByQuery,
} from 'store/showsByQuery/reducers'
import { useShallowEqualSelector } from 'hooks'
import { Helmet } from 'react-helmet'

const ShowsByQuery = () => {
  const { page, loading, error, isLastPage } = useShallowEqualSelector(
    state => state.showsByQuery,
  )
  const shows = useShallowEqualSelector(selectShowsByQuery)
  const dispatch = useDispatch()
  const { search } = useLocation()
  const windowWidth = useContext(WindowWidthContext)

  const getParams = useCallback(
    () => qs.parse(search, { ignoreQueryPrefix: true }),
    [search],
  )

  useEffect(() => {
    dispatch(clearShowsByQuery())
    dispatch(requestShowsByQuery(getParams(), 1))
  }, [dispatch, getParams])

  const fetchNextPage = () => {
    dispatch(requestShowsByQuery(getParams(), page + 1))
  }

  return (
    <Container>
      <Helmet>
        <title>Shows - Drive Up</title>
        <meta name="description" content="Shows list" />
      </Helmet>
      <main>
        <Title>Shows</Title>
        <InfiniteMediaList
          isLastPage={isLastPage}
          fetchNextPage={fetchNextPage}
          loading={loading}
          error={error}
          as="section"
        >
          <MediaGrid as="div">
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

export default ShowsByQuery
