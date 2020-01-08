import React, { useRef } from 'react'
import styled from 'styled-components'
import useComponentSize from '@rehooks/component-size'
import SimpleBar from 'simplebar-react'
import { Link } from 'react-router-dom'
import { Container, MediaGrid, Poster } from 'components'

type Props = {
  results: { id: string; poster: string; name: string }[]
  mediaType: 'movie' | 'show' | 'person'
}

const SearchBarResults = ({ results, mediaType }: Props) => {
  const container = useRef<HTMLDivElement>(null)
  const { height } = useComponentSize(container)

  return (
    <ResultsContainer ref={container}>
      <Container>
        <SimpleBar style={{ maxHeight: height, flex: 1 }}>
          <StyledMediaGrid as="ul">
            {results.map(({ id, poster, name }) => (
              <li key={id}>
                <StyledLink to={`/${mediaType}/${id}`}>
                  <Poster poster={poster} alt={name} />
                </StyledLink>
              </li>
            ))}
          </StyledMediaGrid>
        </SimpleBar>
      </Container>
    </ResultsContainer>
  )
}

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ResultsContainer = styled.div<{ isHidden?: boolean }>`
  flex: 1;
  overflow: hidden;
  display: ${({ isHidden }) => (isHidden ? 'none' : 'block')};
`

const StyledMediaGrid = styled(MediaGrid)`
  padding-bottom: 1rem;
  @media (min-width: 600px) {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }
`

export default SearchBarResults
