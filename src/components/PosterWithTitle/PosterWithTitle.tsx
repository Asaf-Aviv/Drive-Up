import React from 'react'
import styled from 'styled-components'
import { Poster } from 'components'

type Props = {
  poster: string | null
  title: string
  className?: string
}

const PosterWithTitle = ({ poster, title, className }: Props) => (
  <Wrapper className={className}>
    <StyledPoster poster={poster} alt={title} />
    {poster && (
      <TitleContainer>
        <Title>{title}</Title>
      </TitleContainer>
    )}
  </Wrapper>
)

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const StyledPoster = styled(Poster)`
  margin: 0 auto 0.75rem;
`

const TitleContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
`

const Title = styled.span`
  text-align: center;
  font-weight: 500;
  font-size: 0.85rem;
  line-height: 1.3;
`

export default PosterWithTitle
