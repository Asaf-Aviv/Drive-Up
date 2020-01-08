import React from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { BackDrop } from 'components'
import LazyLoad from 'react-lazyload'
import { Episode } from 'store/types'
import { BackDropContainer } from 'components/BackDrop/BackDrop'

const EpisodeCard = ({
  name,
  date,
  episodeNumber,
  overview,
  backdrop,
  crew,
  guestStars,
  seasonNumber,
  showId,
  voteAverage,
  voteCount,
}: Episode) => {
  const { pathname } = useLocation()

  return (
    <StyledLi>
      <StyledLink to={`${pathname}/episode/${episodeNumber}`}>
        <CardHeader>
          <EpisodeName>{name}</EpisodeName>
          <span>{date}</span>
          <span>Eposide: {episodeNumber}</span>
        </CardHeader>
        <LazyLoad offset={400} once>
          <BackDrop imgPath={backdrop} width={500} alt={name} />
        </LazyLoad>
        <Overview>{overview}</Overview>
      </StyledLink>
    </StyledLi>
  )
}

const StyledLi = styled.article`
  width: 100%;
`

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  text-align: center;
  box-shadow: 0 2px 10px black;
  height: 100%;
  background: #000;
  border: 3px solid ${({ theme }) => theme.colors.primary};
  overflow: hidden;
  & ${BackDropContainer} {
    box-shadow: none;
  }
`

const CardHeader = styled.div`
  padding: 1.5rem 0.5rem;
  color: ${props => props.theme.textColors.secondary};
  > span {
    display: block;
    margin-bottom: 0.25rem;
  }
`

const EpisodeName = styled.h3`
  font-size: 1rem;
  color: ${({ theme }) => theme.textColors.primary};
  margin-bottom: 0.25rem;
  font-weight: 500;
`

const Overview = styled.p`
  padding: 1.5rem 1rem;
  flex: 1;
`

export default EpisodeCard
