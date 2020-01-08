import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import LazyLoad from 'react-lazyload'
import styled from 'styled-components'
import { getImgUrl } from 'utils'
import { selectShowById } from 'store/fullShowsByIds/reducers'
import {
  PersonsGrid,
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
  PersonCard,
  BackDrop,
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
    if (show === undefined && !error && !loading) {
      dispatch(requestShowById(showId))
    }
  }, [dispatch, error, loading, show, showId])

  if (error) return <span>error</span>
  if (loading) return <span>Loading</span>
  if (show === null) return <span>Show Not Found</span>
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

  // const director = crew.find(c => c.department === 'Directing');
  // const writers = crew.filter(c => c.department === 'Writing').slice(0, 3);
  // const languageNames = languages.join(', ').toUpperCase()
  // const createdBy = created_by.filter(c => !!c.profile_path).slice(0, 8)

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
      <Container>
        <Section>
          <StyledGenres genres={genres} mediaType="shows" />
          <StyledOverview overview={overview} />
          <MediaDetails
            mediaType="show"
            name={name}
            runtime={runtime}
            seasons={seasonsCount}
            episodes={episodesCount}
            countries={[country]}
            languages={[originalLanguage]}
            homepage={homepage}
          />
        </Section>
        <Section>
          {/* {createdBy[0] && (
            <>
              <SectionTitle>Created By</SectionTitle>
              <LazyLoad offset={200} once>
                <PersonsGrid>
                  {created_by
                    .filter(c => !!c.profile_path)
                    .slice(0, 8)
                    .map(c => (
                      <li key={c.id}>
                        <PersonCard {...c} />
                      </li>
                    ))}
                </PersonsGrid>
              </LazyLoad>
            </>
          )} */}
          <Spacer />
          <SectionTitle>Cast</SectionTitle>
          <PersonsGrid>
            {cast
              .filter(member => member.poster)
              .slice(0, 8)
              .map(member => (
                <PersonCard key={member.id} {...member} />
              ))}
          </PersonsGrid>
        </Section>
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
        <Section>
          <SectionTitle>Recommended</SectionTitle>
          <SlideShow
            currentItemsCount={recommendations.results.length - 1}
            loading={recommendations.loading}
            isLastPage={recommendations.totalPages === recommendations.page}
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
            {recommendations.results.map(s => (
              <MediaSlideItem
                key={s.id}
                id={s.id}
                backdrop={s.backdrop}
                name={s.name}
                mediaType="show"
              />
            ))}
          </SlideShow>
          <SectionTitle>Similar</SectionTitle>
          <LazyLoad offset={400} once>
            <SlideShow
              currentItemsCount={similar.results.length - 1}
              loading={similar.loading}
              isLastPage={similar.totalPages === similar.page}
              loadMore={() => {
                // TODO: fix related shows
                // dispatch(
                //   requestRelatedShows(show.id, 'similar', similar.page + 1),
                // )
              }}
            >
              {similar.results.map(s => (
                <MediaSlideItem
                  key={s.id}
                  id={s.id}
                  backdrop={s.backdrop}
                  name={s.name}
                  mediaType="show"
                />
              ))}
            </SlideShow>
          </LazyLoad>
        </Section>
        <Section>
          <SectionTitle>Images</SectionTitle>
          <SlideShow>
            {backdrops.map(({ url }) => (
              <BackDrop key={url} imgPath={url} alt={name} />
            ))}
          </SlideShow>
          <SlideShow>
            {posters.map(({ url }) => (
              <BackDrop key={url} imgPath={url} alt={name} />
            ))}
          </SlideShow>
          {videos[0] && <Videos videos={videos} />}
        </Section>
      </Container>
      <section>
        <Companies companies={networks} title="Networks" />
        <Companies companies={companies} />
      </section>
    </main>
  )
}

const StyledGenres = styled(Genres)`
  margin-bottom: 2rem;
`

const StyledOverview = styled(Overview)`
  margin-bottom: 4rem;
`

const SeasonsGrid = styled(Grid)`
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
`

export default Show
