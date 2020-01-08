import React from 'react'
import styled from 'styled-components'
import LazyLoad from 'react-lazyload'
import { Link, useLocation } from 'react-router-dom'
import { SeasonSummary } from 'store/types'
import { Poster } from 'components'

const SeasonCard = ({
  date,
  episodesCount,
  poster,
  name,
  overview,
  seasonNumber,
}: SeasonSummary) => {
  const { pathname } = useLocation()

  return (
    <Card to={`${pathname}/season/${seasonNumber}`}>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardText>{date}</CardText>
        <CardText>Episodes: {episodesCount}</CardText>
      </CardHeader>
      <ImageContainer>
        <LazyLoad offset={400} once>
          <StyledPoster poster={poster} width={300} alt={name} />
        </LazyLoad>
      </ImageContainer>
    </Card>
  )
}

const Card = styled(Link)`
  background: #151515;
  transition: transform 150ms;
  border-top: 5px solid ${props => props.theme.colors.primary};
  box-shadow: 0 2px 10px black;
  height: 100%;
  display: flex;
  flex-direction: column;
  &:hover {
    transform: translateY(-4px);
  }
`

const StyledPoster = styled(Poster)`
  box-shadow: none;
  flex: 1;
`

const CardHeader = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
`

const ImageContainer = styled.div`
  margin-top: auto;
  display: flex;
`

const CardTitle = styled.h4`
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
  color: ${({ theme }) => theme.textColors.primary};
`

const CardText = styled.span`
  color: ${({ theme }) => theme.textColors.secondary};
  display: inline-block;
  flex: 1;
  font-size: 14px;
  line-height: 1.3;
  margin-bottom: 0.1rem;
`

export default SeasonCard
