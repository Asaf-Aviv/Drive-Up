import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { requestShowSeason, selectShowSeason } from 'store/showSeasons/reducers'
import {
  EpisodeCard,
  Grid,
  Title,
  Container,
  Overview,
  SectionTitle,
  Poster,
  ErrorMessageWithRetry,
  Loader,
  NotFound,
} from 'components'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useShallowEqualSelector } from 'hooks'

type Params = {
  showId: string
  seasonNumber: string
}

const ShowSeason = () => {
  const dispatch = useDispatch()
  const { showId, seasonNumber } = useParams<Params>()
  const loading = useShallowEqualSelector(({ showSeasons }) => showSeasons.loading)
  const error = useShallowEqualSelector(({ showSeasons }) => showSeasons.error)
  const season = useShallowEqualSelector(selectShowSeason(showId, seasonNumber))

  useEffect(() => {
    dispatch(requestShowSeason(showId, seasonNumber))
  }, [dispatch, seasonNumber, showId])

  const requestSeason = () => {
    dispatch(requestShowSeason(showId, seasonNumber))
  }

  if (loading) return <Loader withContainer />
  if (error) return <ErrorMessageWithRetry mediaType="season" retry={requestSeason} />
  if (season === null) return <NotFound>Season Not Found</NotFound>
  if (!season) return null

  const {
    showName,
    date,
    episodes,
    episodesCount,
    name,
    overview,
    poster,
  } = season

  return (
    <StyledMain>
      <Container>
        <StyledHeader>
          <Link to={`/show/${showId}`}>
            <Title>{showName}</Title>
          </Link>
          <SectionTitle centered as="h2">
            {name}
          </SectionTitle>
          <InfoContainer>
            <StyledPoster centered={!overview} poster={poster} alt={name} />
            <StyledOverview overview={overview} />
          </InfoContainer>
        </StyledHeader>
        <section>
          <SectionTitle as="h2" centered>
            Episodes
          </SectionTitle>
          <StyledGrid>
            {episodes.map(episode => (
              <EpisodeCard key={episode.name} {...episode} />
            ))}
          </StyledGrid>
        </section>
      </Container>
    </StyledMain>
  )
}

const StyledMain = styled.main`
  margin-bottom: 4rem;
`

const StyledHeader = styled.header`
  margin-bottom: 2rem;
`

const InfoContainer = styled.div`
  margin: 0 auto;
  max-width: 768px;
  @media (min-width: 600px) {
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
`

const StyledPoster = styled(Poster)<{ centered: boolean }>`
  @media (max-width: 599px) {
    margin: 0 auto 2rem;
  }
  @media (min-width: 600px) {
    ${props => !props.centered && 'margin-right: 2rem'};
  }
`

const StyledOverview = styled(Overview)`
  @media (max-width: 599px) {
    max-width: 300px;
    text-align: center;
    margin: 0 auto;
  }
`

const StyledGrid = styled(Grid)`
  grid-template-columns: minmax(0, 500px) !important;
  grid-gap: 2rem;
  justify-content: center;
  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)) !important;
  }
`

export default ShowSeason
