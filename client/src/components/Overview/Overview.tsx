import React from 'react';
import {
  Container,
  Box,
  Button,
  Typography,
} from '@material-ui/core';
import { Genre } from '../../store/movies/interfaces';
import useStyles from './styles';

interface Overview {
  backdrop_path: string | null;
  title: string;
  overview: string;
  genres: Genre[];
}

const Overview: React.FC<Overview> = ({
  title,
  backdrop_path,
  overview,
  genres,
}) => {
  const classes = useStyles();

  return (
    <>
      <Container>
        <Box display="flex">
          <Box flex={1} borderRadius={6} overflow="hidden" boxShadow={10}>
            <img
              className={classes.movieImage}
              src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
              alt={title}
              title={title}
            />
          </Box>
          <Box className={classes.overviewContainer}>
            <Typography color="textSecondary" className={classes.overview}>{overview}</Typography>
            <Box>
              <Box component="span" fontSize={16} display="block">
                Genres:
              </Box>
              <Box className={classes.genreGroup} marginTop={1}>
                {genres.map(({ name }) => (
                  <Button color="secondary" variant="outlined" size="small" key={name}>
                    {name}
                  </Button>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
        <Box />
      </Container>
    </>
  );
};

export default Overview;
