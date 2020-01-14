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
      <Container>
        <Section>
          <StyledGenres genres={genres} mediaType="movies" large />
          <StyledOverview overview={overview} />
          <MediaDetails
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
        </Section>
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

const StyledGenres = styled(Genres)`
  margin-bottom: 2rem;
`

const StyledOverview = styled((props: any) => <Overview {...props} />)`
  margin-bottom: 4rem;
`

export default Movie
