import React, { useEffect } from 'react'
import useShallowEqualSelector from 'hooks/useShallowEqualSelector'
import { useParams, Link } from 'react-router-dom'
import styled from 'styled-components'
import LazyLoad from 'react-lazyload'
import { useDispatch } from 'react-redux'
import {
  selectShowSeasonEpisode,
  requestShowSeason,
} from 'store/showSeasons/reducers'
import {
  Title,
  Container,
  Overview,
  BackDrop,
  PersonsGrid,
  PersonCard,
  SectionTitle,
  Section,
  Spacer,
} from 'components'

type Params = {
  showId: string
  seasonNumber: string
  episodeNumber: string
}

const Episode = () => {
  const params = useParams<Params>()
  const dispatch = useDispatch()
  const { loading, error } = useShallowEqualSelector(state => state.showSeasons)
  const episode = useShallowEqualSelector(selectShowSeasonEpisode(params))
  const { showId, seasonNumber } = params

  useEffect(() => {
    if (episode === undefined && !error && !loading) {
      dispatch(requestShowSeason(showId, seasonNumber))
    }
  }, [dispatch, episode, error, loading, seasonNumber, showId])

  if (error) return <span>error</span>
  if (loading) return <span>Loading</span>
  if (episode === null) return <span>Episode Not Found</span>
  if (!episode) return null

  const {
    backdrop,
    crew,
    date,
    episodeNumber,
    voteCount,
    voteAverage,
    seasonName,
    guestStars,
    overview,
    name,
  } = episode

  return (
    <StyledMain>
      <Container>
        <StyledHeader>
          <Link to={`/show/${showId}`}>
            <Title>{name}</Title>
          </Link>
          <EpisodeMetaData>
            <Link to={`/show/${showId}/season/${seasonNumber}`}>
              <SectionTitle centered as="h2">{seasonName}</SectionTitle>
            </Link>
            <SectionTitle centered as="h3">Episode {episodeNumber}</SectionTitle>
            <span>Air Date: {date}</span>
          </EpisodeMetaData>
          <InfoContainer>
            <StyledBackDrop
              centered={!overview}
              imgPath={backdrop}
              alt={name}
              width={500}
            />
            <StyledOverview overview={overview} />
          </InfoContainer>
        </StyledHeader>
        <Section>
          <SectionTitle>Crew</SectionTitle>
          <PersonsGrid as="ul">
            <LazyLoad offset={400} once>
              {crew.map(member => (
                <li key={member.id}>
                  <PersonCard {...member} />
                </li>
              ))}
            </LazyLoad>
          </PersonsGrid>
          <Spacer />
          <SectionTitle>Guest Stars</SectionTitle>
          <PersonsGrid as="ul">
            <LazyLoad offset={400} once>
              {guestStars.map(member => (
                <li key={member.id}>
                  <PersonCard {...member} />
                </li>
              ))}
            </LazyLoad>
          </PersonsGrid>
        </Section>
      </Container>
    </StyledMain>
  )
}

const EpisodeMetaData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  > * {
    margin-bottom: 0.5rem;
    display: inline-block;
  }
`

const StyledMain = styled.main`
  margin-bottom: 4rem;
`

const StyledHeader = styled.header`
  margin-bottom: 4rem;
`

const InfoContainer = styled.div`
  margin: 0 auto;
  max-width: 900px;
  @media (min-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
`

const StyledBackDrop = styled(BackDrop)<{ centered: boolean }>`
  margin: 0 auto 2rem;
  max-width: 500px;
  display: block;
  @media (min-width: 768px) {
    width: 300px;
    flex-shrink: 0;
    ${props => !props.centered && 'margin-right: 2rem'};
  }
`

const StyledOverview = styled((props: any) => <Overview {...props} />)`
  @media (max-width: 599px) {
    max-width: 500px;
    text-align: center;
    margin: 0 auto;
  }
`

export default Episode
