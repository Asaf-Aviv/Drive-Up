import React from 'react';
import {
  Container,
  Box,
  Button,
  Typography,
} from '@material-ui/core';
import { Genre } from '../../store/movies/interfaces';
import useStyles from './styles';
import Genres from '../Genres';

interface Overview {
  backdrop_path: string | null;
  title: string;
  overview: string;
  genres: Genre[];
  mediaType: 'movies' | 'shows';
}

const Overview: React.FC<Overview> = ({
  title,
  backdrop_path,
  overview,
  genres,
  mediaType,
}) => {
  const classes = useStyles();

  return (
    <>
      <Container>
        <Box display="flex">
          <Box flex={1} borderRadius={6} overflow="hidden" boxShadow={10}>
            <img
              className={classes.movieImage}
              src={`https://image.tmdb.org/t/p/w780/${backdrop_path}`}
              alt={title}
              title={title}
            />
          </Box>
          <Box className={classes.overviewContainer}>
            <Typography color="textSecondary" className={classes.overview}>{overview}</Typography>
            <Genres mediaType={mediaType} genres={genres.map(({ id }) => id)} />
          </Box>
        </Box>
        <Box />
      </Container>
    </>
  );
};

export default Overview;
