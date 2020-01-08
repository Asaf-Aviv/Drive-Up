import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import {
  Loader,
  ModalChildrenContainer,
  Container,
  Modal,
  Paper,
  TabsPanel,
  Tab,
  Badge,
  SearchBarResults,
} from 'components'
import { ShortMedia, PersonByQuery } from 'store/types'

type Props = {
  closeResults: () => void
  results: [ShortMedia[], ShortMedia[], PersonByQuery[]]
  loading: boolean
  error: boolean
  isLastPage: boolean
  fetchNextPage: () => void
  totalResults: number
  isInputEmpty: boolean
}

const mediaTypes = ['movie', 'show', 'person'] as const

const NavSearchBarResults = ({
  closeResults,
  results,
  loading,
  error,
  isLastPage,
  fetchNextPage,
  totalResults,
  isInputEmpty,
}: Props) => {
  const [activeTab, setActiveTab] = useState(0)
  const handleTabClick = (i: number) => () => setActiveTab(i)

  const badges = {
    movies: results[0].filter(m => m.poster).length,
    shows: results[1].filter(s => s.poster).length,
    persons: results[2].filter(p => p.poster).length,
  }

  const noResults = () => totalResults === 0

  const hasNextPage = () => !isLastPage && !loading && totalResults !== 0

  const noMoreResults = () =>
    !isInputEmpty && !loading && isLastPage && totalResults !== -1

  return (
    <StyledModal closeModal={closeResults}>
      <ModalChildrenContainer>
        <StyledContainer>
          <StyledPaper>
            <TabsPanel>
              {['movies', 'shows', 'persons'].map((tab, i) => (
                <Tab
                  tabIndex={0}
                  key={tab}
                  active={activeTab === i}
                  onClick={handleTabClick(i)}
                >
                  {tab}
                  <Badge num={badges[tab as keyof typeof badges]} />
                </Tab>
              ))}
            </TabsPanel>
            <SearchBarResults
              mediaType={mediaTypes[activeTab]}
              results={results[activeTab]}
            />
            <Footer>
              {loading && (
                <LoadMoreButton disabled>
                  <Loader />
                </LoadMoreButton>
              )}
              {hasNextPage() && (
                <LoadMoreButton onClick={fetchNextPage}>
                  Load More
                </LoadMoreButton>
              )}
              {error && (
                <LoadMoreButton onClick={fetchNextPage}>
                  Try Again
                </LoadMoreButton>
              )}
              {noMoreResults() && <p>No More Results</p>}
              {noResults() && <p>No Results Found</p>}
            </Footer>
          </StyledPaper>
        </StyledContainer>
      </ModalChildrenContainer>
    </StyledModal>
  )
}

const Footer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(36px + 2rem);
  background: #262626;
  font-weight: 600;
  @media (min-width: 768px) {
    height: calc(54px + 2rem);
  }
`

const LoadMoreButton = styled.button`
  ${(props) => {
    const { primary } = props.theme.colors

    return css`
      height: 36px;
      text-transform: uppercase;
      border: 3px solid ${primary};
      background: transparent;
      color: #fff;
      outline: none;
      transition: background 250ms;
      font-weight: 600;
      display: flex;
      width: 150px;
      justify-content: center;
      align-items: center;
      box-shadow: 0px 3px 10px 3px rgb(23, 21, 21);
      &:hover:not(:disabled) {
        background: ${primary};
      }
      @media (min-width: 768px) {
        width: 170px;
        height: 52px;
      }
    `
  }}
`

const StyledContainer = styled(Container)`
  height: 100%;
  @media (max-width: 1099px) {
    max-width: 100%;
    padding: 0;
  }
`

const StyledPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  background: #1d1d1d;
`

const StyledModal = styled(Modal)`
  top: 64px;
`

export default NavSearchBarResults
