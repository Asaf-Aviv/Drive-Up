import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import LazyLoad from 'react-lazyload'
import styled from 'styled-components'
import { getImgUrl } from 'utils'
import { selectShowById } from 'store/fullShowsByIds/reducers'
import {
  Overview,
  Companies,
  SectionTitle,
  MediaHeader,
  TransparentBG,
  Genres,
  Spacer,
  Section,
  Container,
  MediaDetails,
  SlideShow,
  MediaSlideItem,
  Videos,
  SeasonCard,
  Grid,
  NotFound,
  Images,
  ErrorMessageWithRetry,
  Loader,
  PersonsSection,
  Visible,
} from 'components'
import { useShallowEqualSelector } from 'hooks'
import { requestShowById } from 'store/show/reducers'
import { ImageHeader } from 'components/MediaHeader'

type Params = {
  showId: string
}

const Show = () => {
  const { showId } = useParams<Params>()
  const show = useShallowEqualSelector(selectShowById(showId))
  const { loading, error } = useShallowEqualSelector(state => state.movie)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(requestShowById(showId))
  }, [dispatch, showId])

  const requestShow = () => {
    dispatch(requestShowById(showId))
  }

  if (error) return <ErrorMessageWithRetry mediaType="show" retry={requestShow} />
  if (loading) return <Loader withContainer />
  if (show === null) return <NotFound>Show Not Found</NotFound>
  if (!show) return null

  const {
    name,
    backdrop,
    genres,
    overview,
    companies,
    country,
    networks,
    seasons,
    similar,
    recommendations,
    originalLanguage,
    posters,
    backdrops,
    videos,
    poster,
    date,
    voteAverage,
    runtime,
    homepage,
    cast,
    crew,
    nextEpisodeDate,
    seasonsCount,
    episodesCount,
    trailer,
  } = show

  return (
    <main>
      <ImageHeader bgImg={getImgUrl(backdrop, 1280)}>
        <TransparentBG />
      </ImageHeader>
      <MediaHeader
        poster={poster}
        runtime={runtime}
        name={name}
        date={date}
        voteAverage={voteAverage}
        type="show"
        trailer={trailer}
        nextEpisode={nextEpisodeDate}
      />
      <Section>
        <Container>
          <StyledGenres genres={genres} mediaType="shows" large />
        </Container>
        <ShowMetaData>
          <StyledContainer>
            <StyledMediaDetails
              mediaType="show"
              name={name}
              runtime={runtime}
              seasons={seasonsCount}
              episodes={episodesCount}
              countries={[country]}
              languages={[originalLanguage]}
              homepage={homepage}
            />
            <Overview overview={overview} />
          </StyledContainer>
        </ShowMetaData>
      </Section>
      <Container>
        <Section>
          <PersonsSection title="Cast" persons={cast} />
          {cast[0] && <Spacer />}
          <PersonsSection title="Crew" persons={crew} />
        </Section>
        <Visible when={seasons[0]}>
          <Section>
            <SectionTitle>Seasons</SectionTitle>
            <SeasonsGrid as="ul">
              {seasons.map(season => (
                <li key={season.name}>
                  <SeasonCard {...season} />
                </li>
              ))}
            </SeasonsGrid>
          </Section>
        </Visible>
        <Section>
          <Images backdrops={backdrops} posters={posters} alt={name} />
          <Videos videos={videos} />
        </Section>
        <Section>
          <Visible when={recommendations.results[0]}>
            <SectionTitle>Recommended</SectionTitle>
            <SlideShow
              currentItemsCount={recommendations.results.length - 1}
              loading={recommendations.loading}
              isLastPage={recommendations.isLastPage}
              loadMore={() => {
                // TODO: fix related shows
                // dispatch(
                // requestRelatedShows(
                //   show.id,
                //   'recommendations',
                //   recommendations.page + 1,
                // ),
                // )
              }}
            >
              {recommendations.results.map(recommendedShow => (
                <MediaSlideItem
                  key={recommendedShow.id}
                  id={recommendedShow.id}
                  backdrop={recommendedShow.backdrop}
                  name={recommendedShow.name}
                  mediaType="show"
                />
              ))}
            </SlideShow>
            <Spacer />
          </Visible>
          <Visible when={similar.results[0]}>
            <SectionTitle>Similar</SectionTitle>
            <LazyLoad offset={400} once>
              <SlideShow
                currentItemsCount={similar.results.length - 1}
                loading={similar.loading}
                isLastPage={similar.isLastPage}
                loadMore={() => {
                  // TODO: fix related shows
                  // dispatch(
                  //   requestRelatedShows(show.id, 'similar', similar.page + 1),
                  // )
                }}
              >
                {similar.results.map(similarShow => (
                  <MediaSlideItem
                    key={similarShow.id}
                    id={similarShow.id}
                    backdrop={similarShow.backdrop}
                    name={similarShow.name}
                    mediaType="show"
                  />
                ))}
              </SlideShow>
            </LazyLoad>
          </Visible>
        </Section>
      </Container>
      <section>
        <Companies companies={networks} title="Networks" />
        <Companies companies={companies} />
      </section>
    </main>
  )
}

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  position: relative;
  @media (min-width: 900px) {
    flex-direction: row;
    padding: 0;
    width: calc(95% - 2rem);
    max-width: calc(1280px - 2rem);
    background: ${props => props.theme.colors.body};
    > div:first-of-type {
      margin-right: 1rem;
      flex-basis: 350px;
      flex-shrink: 0;
    }
  }
`

const ShowMetaData = styled.div`
  order: 1;
  @media (min-width: 900px) {
    position: relative;
    &::before {
      position: absolute;
      content: '';
      background: ${props => props.theme.colors.primary};
      left: 0;
      top: 0;
      bottom: 0;
      right: 80%;
    }
  }
`

const StyledMediaDetails = styled(MediaDetails)`
  order: 1;
  margin-top: 2rem;
  @media (min-width: 900px) {
    margin-top: 0rem;
    order: 0;
    padding: 1rem 0;
    background: ${props => props.theme.colors.primary};
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
  }
`

const SeasonsGrid = styled(Grid)`
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
`

const StyledGenres = styled(Genres)`
  margin-bottom: 2rem;
`

export default Show
