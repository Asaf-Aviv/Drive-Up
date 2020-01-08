import React, { useEffect, useRef, useCallback, useContext } from 'react'
import qs from 'qs'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router'
import { Container } from '@material-ui/core'
import { WindowWidthContext } from 'components/WindowWidthProvider'
import { PosterLink, MediaGrid, MediaCard, InfiniteMediaList } from 'components'
import {
  selectShowsByQuery,
  requestShowsByQuery,
  clearShowsByQuery,
} from 'store/showsByQuery/reducers'
import { useIsFirstRender, useShallowEqualSelector } from 'hooks'

const ShowsByQuery = () => {
  const { page, loading, error, isLastPage } = useShallowEqualSelector(
    state => state.showsByQuery,
  )
  const shows = useShallowEqualSelector(selectShowsByQuery)
  const dispatch = useDispatch()
  const { search } = useLocation()
  const isFirstRender = useIsFirstRender()
  const fetchNextPageTrigger = useRef<HTMLElement>(null)
  const windowWidth = useContext(WindowWidthContext)

  const getParams = useCallback(
    () => qs.parse(search, { ignoreQueryPrefix: true }),
    [search],
  )

  useEffect(() => {
    if (isFirstRender) return

    dispatch(clearShowsByQuery())
    dispatch(requestShowsByQuery(getParams(), 1))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, getParams])

  useEffect(() => {
    if (isFirstRender && !shows.length) {
      dispatch(clearShowsByQuery())
      dispatch(requestShowsByQuery(getParams(), 1))
    }
  }, [dispatch, getParams, isFirstRender, shows.length])

  const fetchNextPage = () => {
    dispatch(requestShowsByQuery(getParams(), page + 1))
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
