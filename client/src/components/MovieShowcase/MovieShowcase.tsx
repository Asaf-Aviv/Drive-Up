import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Link,
} from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { MovieShowcase as IMovieShowcase } from '../../store/movies/interfaces';
import useStyles from './styles';
import Genres from '../Genres';

const MovieShowcase: React.FC<IMovieShowcase> = ({
  id,
  title,
  original_language,
  overview,
  poster_path,
  release_date,
  genre_ids,
}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper} elevation={5}>
      <Box display="flex">
        <Box display="inline-flex" flexBasis={154}>
          <img
            style={{ alignSelf: 'flex-start' }}
            src={`http://image.tmdb.org/t/p/w154/${poster_path}`}
            alt={title}
          />
        </Box>
        <Box display="flex" flexDirection="column" padding={2} width="100%">
          <RouterLink className={classes.link} to={`/movie/${id}`}>
            <Typography
              variant="h5"
              component="h2"
              align="center"
              color="secondary"
            >
              {title}
            </Typography>
          </RouterLink>
          <Genres mediaType="movies" genres={genre_ids} />
          <Typography className={classes.overview} variant="subtitle1">{overview}</Typography>
          <Box display="flex" alignItems="center" fontWeight="bold">
            <Box component="span" mr={2}>
              {`Release Date: ${new Date(release_date).toLocaleDateString()}`}
            </Box>
            <Box component="span" mr={2}>
              {`Language: ${original_language.toUpperCase()}`}
            </Box>
            <Link
              color="secondary"
              component={RouterLink}
              className={classes.footerLink}
              to={`/movie/${id}`}
            >
              <Box display="flex" alignItems="center" ml="auto">
                <Typography>Read More</Typography>
                <ArrowRightAltIcon />
              </Box>
            </Link>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default MovieShowcase;
