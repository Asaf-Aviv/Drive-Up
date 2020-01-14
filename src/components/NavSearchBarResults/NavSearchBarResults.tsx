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
  Button,
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
}: Props) => {
  const [activeTab, setActiveTab] = useState(0)
  const handleTabClick = (i: number) => () => setActiveTab(i)

  const badgeCount = {
    movies: results[0].length,
    shows: results[1].length,
    persons: results[2].length,
  }

  const noResults = () => !loading && !error && totalResults === 0

  const hasNextPage = () => !isLastPage && !loading && totalResults !== 0

  const noMoreResults = () => !loading && isLastPage && totalResults !== -1

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
                  <Badge count={badgeCount[tab as keyof typeof badgeCount]} />
                </Tab>
              ))}
            </TabsPanel>
            <SearchBarResults
              mediaType={mediaTypes[activeTab]}
              results={results[activeTab]}
            />
            <Footer>
              {loading && (
                <StyledButton disabled>
                  <StyledLoader />
                </StyledButton>
              )}
              {hasNextPage() && (
                <StyledButton onClick={fetchNextPage}>
                  Load More
                </StyledButton>
              )}
              {error && (
                <StyledButton onClick={fetchNextPage}>
                  Try Again
                </StyledButton>
              )}
              {noMoreResults() && <StyledP>No More Results</StyledP>}
              {noResults() && <StyledP>No Results Found</StyledP>}
            </Footer>
          </StyledPaper>
        </StyledContainer>
      </ModalChildrenContainer>
    </StyledModal>
  )
}

const StyledP = styled.p`
  color: ${({ theme }) => theme.colors.secondary}
`

const StyledButton = styled(Button)`
  height: 50px;
  width: 140px;
  padding: 0;
`

const StyledLoader = styled(Loader)`
  margin: 0;
  height: 36px;
  width: 36px;
`

const Footer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(36px + 2rem);
  background: ${props => props.theme.colors.primaryDark};
  font-weight: 600;
  @media (min-width: 768px) {
    height: calc(54px + 2rem);
  }
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
  background: ${props => props.theme.colors.body};
`

const StyledModal = styled(Modal)`
  top: 64px;
`

export default NavSearchBarResults
