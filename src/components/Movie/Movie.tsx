import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {
  Overview,
  PersonsGrid,
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
  PersonCard,
  MediaSlideItem,
  SlideShow,
  Companies,
  Container,
} from 'components'
import { selectMovieById } from 'store/fullMoviesByIds/reducers'
import { getImgUrl } from 'utils'
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
    if (movie === undefined && !error && !loading) {
      dispatch(requestMovieById(movieId))
    }
  }, [dispatch, error, loading, movie, movieId])

  if (error) return <span>error</span>
  if (loading) return <span>Loading</span>
  if (movie === null) return <span>Movie Not Found</span>
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
          <StyledGenres genres={genres} mediaType="movies" />
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
          <SectionTitle>Cast</SectionTitle>
          <PersonsGrid>
            {cast
              .filter(member => member.poster)
              .slice(0, 8)
              .map(member => (
                <PersonCard key={member.id} {...member} />
              ))}
          </PersonsGrid>
          <SectionTitle>Crew</SectionTitle>
          <Spacer />
          <PersonsGrid>
            {crew
              .filter(member => member.poster)
              .slice(0, 8)
              .map(member => (
                <PersonCard key={member.id} {...member} />
              ))}
          </PersonsGrid>
        </Section>
        <Section>
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
