import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import {
  Typography,
  Box,
  Link,
  Container,
} from '@material-ui/core';
import Gallery from 'react-photo-gallery';
import { requestMovieById, requestRelatedMovies } from '../../store/movies/actions';
import useShallowEqualSelector from '../../hooks/useShallowEqualSelector';
import { minutesConverter } from '../../utils';
import useStyles from './styles';
import TMDB from '../../api';
import TabsPanel from '../TabsPanel';
import Videos from '../Videos/Videos';
import Overview from '../Overview';
import Companies from '../Companies';
import MoviesList from '../MoviesList';

interface Params {
  movieId: string;
}

const Movie: React.FC<RouteComponentProps<Params>> = ({
  match: { params: { movieId } },
}) => {
  const { byId: movies, byId: { loading, error } } = useShallowEqualSelector(
    state => state.movies
  );

  const dispatch = useDispatch();
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState(0);

  const movie = movies[+movieId];

  useEffect(() => {
    setTabIndex(0);
  }, [movieId]);

  useEffect(() => {
    if (!movie && !loading && !error) {
      dispatch(requestMovieById(movieId));
    }
  }, [dispatch, error, loading, movie, movieId]);

  if (loading) return <span>Loading</span>;

  if (!movie) return <span>Movie Not Found</span>;

  console.log(movie);

  const {
    title,
    release_date,
    budget,
    revenue,
    runtime,
    backdrop_path,
    genres,
    homepage,
    overview,
    belongs_to_collection: series,
    production_companies: companies,
    similar,
    recommendations,
    videos,
    images,
  } = movie;

  return (
    <main>
      <Container>
        <Typography className={classes.title} variant="h3" component="h1">
          {title}
        </Typography>
        <Box className={classes.generalInfo} fontStyle="italic">
          <Box component="span">{`Release Date:  ${release_date}`}</Box>
          {runtime && <Box>{`Runtime:  ${minutesConverter(runtime)}`}</Box>}
          {homepage && (
            <Link
              color="secondary"
              rel="noopener noreferrer"
              target="_blank"
              href={homepage}
            >
              Homepage
            </Link>
          )}
        </Box>
        <Box className={classes.generalInfo}>
          {!!budget && (
            <Box component="span">{`Budget: $${budget.toLocaleString()}`}</Box>
          )}
          {!!revenue && (
            <Box component="span">{`Revenue: $${revenue.toLocaleString()}`}</Box>
          )}
        </Box>
        <TabsPanel
          tabs={['Overview', 'Similar', 'Recommended', 'Images', 'Videos']}
          activeTabIndex={tabIndex}
          setNextTab={setTabIndex}
        />
      </Container>
      {tabIndex === 0 && (
        <>
          <Overview
            backdrop_path={backdrop_path}
            title={title}
            genres={genres}
            overview={overview}
          />
          {series && (
            <Container>
              <Box marginBottom={6}>
                <Typography variant="h4">{series.name}</Typography>
                <Box flex={1} borderRadius={6} overflow="hidden" boxShadow={10}>
                  <img
                    className={classes.movieImage}
                    src={`https://image.tmdb.org/t/p/original/${series.backdrop_path}`}
                    alt={series.name}
                    title={series.name}
                  />
                </Box>
              </Box>
            </Container>
          )}
          <Companies companies={companies} />
        </>
      )}
      {tabIndex === 1 && (
        <>
          <Container>
            <Typography align="right" color="textSecondary">
              <em>{`Showing ${similar.results.length} of ${similar.total_results} Results`}</em>
            </Typography>
            <MoviesList
              movies={similar.results}
              fetchNextPage={() => dispatch(
                requestRelatedMovies(movie.id, 'similar', similar.page + 1)
              )}
              loading={similar.loading}
              error={similar.error}
              isLastPage={similar.page === similar.total_pages}
            />
          </Container>
        </>
      )}
      {tabIndex === 2 && (
        <>
          <Container>
            <Typography align="right" color="textSecondary">
              <em>
                {`Showing ${recommendations.results.length} 
                of ${recommendations.total_results} Results`}
              </em>
            </Typography>
            <MoviesList
              movies={recommendations.results}
              fetchNextPage={() => dispatch(
                requestRelatedMovies(movie.id, 'recommendations', recommendations.page + 1)
              )}
              loading={recommendations.loading}
              error={recommendations.error}
              isLastPage={recommendations.page === recommendations.total_pages}
            />
          </Container>
        </>
      )}
      {tabIndex === 3 && (
        <>
          <Gallery
            photos={images.backdrops.map(i => ({
              ...i,
              src: `${TMDB.imgURL}/original/${i.file_path}`,
            }))}
          />
          <Gallery
            photos={images.posters.map(i => ({
              ...i,
              src: `${TMDB.imgURL}/original/${i.file_path}`,
            }))}
          />
        </>
      )}
      {tabIndex === 4 && <Videos videos={videos.results} />}
    </main>
  );
};


export default Movie;
