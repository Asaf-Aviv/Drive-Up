import React from 'react';
import { Button, Box } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { genreIdToString } from '../../utils';
import useStyles from './styles';

interface Genres {
  genres: number[];
  mediaType: 'movies' | 'shows';
}

const Genres: React.FC<Genres> = ({ genres, mediaType }) => {
  const classes = useStyles();

  return (
    <Box className={classes.genreGroup} marginTop={1}>
      {genres.map(genre => (
        <RouterLink
          className={classes.link}
          key={genre}
          to={`/${mediaType}/?with_genres=${genre}`}
        >
          <Button
            className={classes.buttonLink}
            color="secondary"
            variant="outlined"
            size="small"
          >
            {genreIdToString(genre)}
          </Button>
        </RouterLink>
      ))}
    </Box>
  );
};

export default Genres;
