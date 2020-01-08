import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import LazyLoad from 'react-lazyload'
import styled from 'styled-components'
import { selectPersonsByQuery, requestPersonsByQuery } from 'store/personsByQuery/reducers'
import { useShallowEqualSelector, useOnVisibilityTrigger } from 'hooks'
import { PersonsGrid, InfiniteMediaList, Container, PersonCard } from 'components'

const Persons = () => {
  const {
    page,
    loading,
    error,
    isLastPage,
  } = useShallowEqualSelector(state => state.personsByQuery)
  const persons = useShallowEqualSelector(selectPersonsByQuery)
  const dispatch = useDispatch()
  const fetchNextPageTrigger = useRef<HTMLElement>(null)

  const fetchNextPage = () => {
    dispatch(requestPersonsByQuery(undefined, page + 1))
  }

  useEffect(() => {
    if (persons.length) return

    dispatch(requestPersonsByQuery(undefined, 1))
  }, [dispatch, persons.length])

  useOnVisibilityTrigger(fetchNextPageTrigger, fetchNextPage)

  return (
    <StyledMain>
      <Container>
        <InfiniteMediaList
          as="div"
          fetchNextPage={fetchNextPage}
          isLastPage={isLastPage}
          loading={loading}
          error={error}
        >
          <PersonsGrid as="ul">
            {persons.map(({ id, poster, name }) => (
              <li key={id}>
                <LazyLoad offset={400} once>
                  <PersonCard id={id} poster={poster} name={name} />
                </LazyLoad>
              </li>
            ))}
          </PersonsGrid>
        </InfiniteMediaList>
      </Container>
    </StyledMain>
  )
}

const StyledMain = styled.main`
  margin-top: 2rem;
`

export default Persons
