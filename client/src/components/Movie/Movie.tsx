import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import {
  Typography,
  Box,
  Link,
  Tabs,
  Tab,
  List,
  ListItem,
} from '@material-ui/core';
import Gallery from 'react-photo-gallery';
import { requestMovieById } from '../../store/moviesByIds/actions';
import useShallowEqualSelector from '../../hooks/useShallowEqualSelector';
import { minutesConverter } from '../../utils';
import Container from '../Container';
import MovieOverview from '../MovieOverview';
import MovieShowcase from '../MovieShowcase';
import useStyles from './styles';
import TMDB from '../../api';

interface Params {
  movieId: string;
}

const Movie: React.FC<RouteComponentProps<Params>> = ({
  match: {
    params: { movieId },
  },
}) => {
  const { movies, loading, error } = useShallowEqualSelector(
    state => state.moviesByIds
  );
  const dispatch = useDispatch();
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState(0);

  const movie = movies[movieId];

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
      <Container paddingTop>
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
        <Tabs
          className={classes.tabsContainer}
          value={tabIndex}
          onChange={(e, newTabIndex) => setTabIndex(newTabIndex)}
          textColor="secondary"
          centered
        >
          <Tab label="Overview" />
          <Tab label="Similar" />
          <Tab label="Recommended" />
          <Tab label="Images" />
          <Tab label="Videos" />
        </Tabs>
      </Container>
      <Typography component="div" hidden={tabIndex !== 0}>
        <MovieOverview
          backdrop_path={backdrop_path}
          title={title}
          genres={genres}
          overview={overview}
          series={series}
          companies={companies}
        />
      </Typography>
      <Typography component="div" hidden={tabIndex !== 1}>
        <Container>
          <Typography
            align="right"
            color="textSecondary"
          >
            <em>{`Showing ${similar.results.length} of ${similar.total_results} Results`}</em>
          </Typography>
          <List className={classes.movieList}>
            {similar.results.map(similarMovie => (
              <ListItem key={similarMovie.id} disableGutters>
                <MovieShowcase {...similarMovie} />
              </ListItem>
            ))}
          </List>
        </Container>
      </Typography>
      <Typography component="div" hidden={tabIndex !== 2}>
        <Container>
          <Typography
            align="right"
            color="textSecondary"
          >
            <em>
              {`Showing ${recommendations.results.length} 
              of ${recommendations.total_results} Results`}
            </em>
          </Typography>
          <List className={classes.movieList}>
            {recommendations.results.map(recommended => (
              <ListItem key={recommended.id} disableGutters>
                <MovieShowcase {...recommended} />
              </ListItem>
            ))}
          </List>
        </Container>
      </Typography>
      <Typography component="div" hidden={tabIndex !== 3}>
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
      </Typography>
      <Typography component="div" hidden={tabIndex !== 4}>
        <Container>
          <Box className={classes.videosContainer}>
            {videos.results.map(video => (
              <Box boxShadow={10} key={video.id}>
                <iframe
                  title={video.name}
                  allowFullScreen
                  src={`https://www.youtube.com/embed/${video.key}`}
                />
              </Box>
            ))}
          </Box>
        </Container>
      </Typography>
    </main>
  );
};

export default Movie;
