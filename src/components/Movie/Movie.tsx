import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {
  Overview,
  Spacer,
  SectionDivider,
  Section,
  SectionTitle,
  TransparentBG,
  MediaHeader,
  Videos,
  Genres,
  MediaDetails,
  BackDrop,
  PersonsSection,
  MediaSlideItem,
  SlideShow,
  Companies,
  Container,
  Loader,
  NotFound,
  Images,
  Visible,
} from 'components'
import { selectMovieById } from 'store/fullMoviesByIds/reducers'
import { getImgUrl } from 'utils'
import ErrorMessageWithRetry from 'components/ErrorMessageWithRetry'
import { requestMovieById } from '../../store/movie/reducers'
import useShallowEqualSelector from '../../hooks/useShallowEqualSelector'
import { ImageHeader } from '../MediaHeader/MediaHeader'

type Params = {
  movieId: string
}

const Movie = () => {
  const { movieId } = useParams<Params>()
  const movie = useShallowEqualSelector(selectMovieById(movieId))
  const { loading, error } = useShallowEqualSelector(state => state.movie)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(requestMovieById(movieId))
  }, [dispatch, movieId])

  const requestMovie = () => {
    dispatch(requestMovieById(movieId))
  }

  if (error) return <ErrorMessageWithRetry mediaType="movie" retry={requestMovie} />
  if (loading) return <Loader withContainer />
  if (movie === null) return <NotFound>Movie Not Found</NotFound>
  if (!movie) return null

  const {
    name,
    budget,
    revenue,
    runtime,
    genres,
    homepage,
    overview,
    collection,
    companies,
    languages,
    similar,
    recommendations,
    videos,
    countries,
    cast,
    crew,
    date,
    backdrop,
    poster,
    backdrops,
    posters,
    voteAverage,
    tagline,
    pg,
    trailer,
    director,
    originalLanguage,
    writers,
    voteCount,
  } = movie

  return (
    <main>
      <ImageHeader bgImg={getImgUrl(backdrop, 1280)}>
        <TransparentBG />
      </ImageHeader>
      <MediaHeader
        runtime={runtime}
        name={name}
        date={date}
        poster={poster}
        voteAverage={voteAverage}
        tagline={tagline}
        trailer={trailer}
        type="movie"
        pg={pg}
      />
      <Section>
        <Container>
          <StyledGenres genres={genres} mediaType="movies" large />
        </Container>
        <MovieMetaData>
          <StyledContainer>
            <StyledMediaDetails
              mediaType="movie"
              name={name}
              runtime={runtime}
              director={director}
              writers={writers}
              countries={countries}
              languages={languages}
              budget={budget}
              revenue={revenue}
              homepage={homepage}
            />
            <Overview overview={overview} />
          </StyledContainer>
        </MovieMetaData>
      </Section>
      <Container>
        <Section>
          <PersonsSection title="Cast" persons={cast} />
          {cast[0] && <Spacer />}
          <PersonsSection title="Crew" persons={crew} />
        </Section>
        <Section>
          <Images backdrops={backdrops} posters={posters} alt={name} />
          <Spacer />
          <Videos videos={videos} />
          {collection && (
            <>
              <SectionDivider />
              <SectionTitle>Collection</SectionTitle>
              <Link to={`/movies/collections/${collection.id}`}>
                <BackDrop imgPath={collection.backdrop} alt={collection.name} />
              </Link>
            </>
          )}
        </Section>
        <Section>
          <Visible when={recommendations.results[0]}>
            <SectionTitle as="h3">Recommended</SectionTitle>
            <SlideShow
              currentItemsCount={recommendations.results.length - 1}
              loading={recommendations.loading}
              isLastPage={recommendations.isLastPage}
              loadMore={() => {
                // TODO: fix related movies
                // dispatch(
                //   requestRelatedMovies(
                //     movie.id,
                //     'recommendations',
                //     recommendations.page + 1,
                //   ),
                // )
              }}
            >
              {recommendations.results.map(recommendedMovie => (
                <MediaSlideItem
                  key={recommendedMovie.id}
                  mediaType="movie"
                  {...recommendedMovie}
                />
              ))}
            </SlideShow>
            <Spacer />
          </Visible>
          <Visible when={similar.results[0]}>
            <SectionTitle>Similar</SectionTitle>
            <SlideShow
              currentItemsCount={similar.results.length - 1}
              loading={similar.loading}
              isLastPage={similar.isLastPage}
              loadMore={() => {
                // TODO: fix related movies
                // dispatch(
                //   requestRelatedMovies(movie.id, 'similar', similar.page + 1),
                // )
              }}
            >
              {similar.results.map(similarMovie => (
                <MediaSlideItem
                  key={similarMovie.id}
                  mediaType="movie"
                  {...similarMovie}
                />
              ))}
            </SlideShow>
          </Visible>
        </Section>
      </Container>
      <section>
        <Companies companies={companies} />
      </section>
    </main>
  )
}

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
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

const MovieMetaData = styled.div`
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
      z-index: -1;
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

const StyledGenres = styled(Genres)`
  margin-bottom: 2rem;
`
export default Movie
