import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { Search as SearchIcon } from '@material-ui/icons'
import { useDispatch } from 'react-redux'
import { selectSearchResults, requestSearchResults } from 'store/search/reducers'
import { Category } from 'store/types'
import { useShallowEqualSelector } from 'hooks'
import { NavSearchBarResults } from 'components'

type RequestResults = (
  searchQuery: string,
  searchCategory: Category,
  searchPage: number,
) => void

const NavSearchBar = () => {
  const [query, setQuery] = useState('')
  const [showResults, setShowResults] = useState(false)
  const location = useLocation()
  const dispatch = useDispatch()
  const results = useShallowEqualSelector(selectSearchResults)
  const {
    page,
    totalResults,
    isLastPage,
    loading,
    error,
  } = useShallowEqualSelector(({ search }) => search)

  const requestResults: RequestResults = (
    searchQuery,
    searchCategory,
    searchPage,
  ) => {
    dispatch(requestSearchResults(searchCategory, { query: searchQuery }, searchPage))
  }

  const fetchNextPage = () => requestResults(query, 'multi', page + 1)

  const closeResults = () => setShowResults(false)

  useEffect(closeResults, [location])

  useEffect(() => {
    if (!query) {
      return setShowResults(false)
    }

    requestResults(query, 'multi', 1)
    setShowResults(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const handleOnFocus = () => {
    query && setShowResults(true)
  }

  return (
    <Container>
      <InputContainer>
        <Input
          aria-label="Search bar"
          onFocus={handleOnFocus}
          value={query}
          placeholder="Search movies, shows or persons"
          onChange={handleOnChange}
        />
        <StyledSearchIcon />
      </InputContainer>
      {showResults && (
        <NavSearchBarResults
          results={results}
          closeResults={closeResults}
          loading={loading}
          isLastPage={isLastPage}
          fetchNextPage={fetchNextPage}
          error={error}
          totalResults={totalResults}
        />
      )}
    </Container>
  )
}

const Container = styled.div`
  flex: 1;
`

const InputContainer = styled.div`
  position: relative;
  display: flex;
  margin-left: auto;
  @media (min-width: 1100px) {
    max-width: 500px;
  }
`

const StyledSearchIcon = styled(SearchIcon)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0.5rem;
`

const Input = styled.input`
  height: 40px;
  background: ${({ theme }) => theme.colors.primaryDark};
  color: #FFF;
  border: none;
  padding-left: 0.5rem;
  flex: 1;
  outline-color: transparent;
  transition: outline-color 250ms;
  font-size: 1rem;
  box-shadow: 0 2px 7px #000d1a;
  &::placeholder {
    font-size: 0.8rem;
    font-style: italic;
    color: #bfbfbf;
  }
  &:focus {
    outline-color: #00f8e3;
  }
  @media (min-width: 400px) {
    padding-left: 1rem;
    &::placeholder {
      font-size:1rem;
    }
  }
`

export default NavSearchBar
