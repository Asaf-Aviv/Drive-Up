import React, { useEffect } from 'react'
import useShallowEqualSelector from 'hooks/useShallowEqualSelector'
import { useParams, Link } from 'react-router-dom'
import styled from 'styled-components'
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
  SectionTitle,
  Section,
  Spacer,
  PersonsSection,
} from 'components'
import Visible from 'components/Visible'
import { Helmet } from 'react-helmet'

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
    seasonName,
    guestStars,
    overview,
    name,
  } = episode

  return (
    <StyledMain>
      <Helmet>
        <title>{`${name} ${seasonName} Episode ${episodeNumber} - Drive Up`}</title>
        <meta name="description" content={`Details page about episode ${episodeNumber} of ${name} ${seasonName}`} />
      </Helmet>
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
            <span>Air Date - {date}</span>
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
        <Visible when={crew[0] || guestStars[0]}>
          <Section>
            <PersonsSection title="Crew" persons={crew} />
            {crew[0] && <Spacer />}
            <PersonsSection title="Guest Stars" persons={guestStars} />
          </Section>
        </Visible>
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
