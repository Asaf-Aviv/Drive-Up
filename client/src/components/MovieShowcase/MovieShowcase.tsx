import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { MovieShowcase as IMovieShowcase } from '../../store/movies/interfaces';

const useStyles = makeStyles({
  paper: {
    marginBottom: 24,
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  overview: {
    maxWidth: 650,
    textAlign: 'center',
    margin: '0 auto',
    fontSize: '0.9em',
  },
});

const MovieShowcase: React.FC<IMovieShowcase> = ({
  id,
  title,
  original_language,
  overview,
  poster_path,
  release_date,
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
        <Box padding={3} width="100%">
          <Box display="flex" alignItems="center">
            <Box flex={1} component="span" paddingRight={3} fontWeight={600}>
              {`Release Date: ${new Date(release_date).toLocaleDateString()}`}
            </Box>
            <Link className={classes.link} to={`/movie/${id}`}>
              <Typography
                variant="h5"
                component="h2"
                align="center"
                gutterBottom
              >
                {title}
              </Typography>
            </Link>
            <Box
              flex={1}
              textAlign="right"
              component="span"
            >
              {`Language ${original_language.toUpperCase()}`}
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography className={classes.overview} variant="subtitle1">{overview}</Typography>
          </Box>
        </Box>
      </Box>

    </Paper>
  );
};

export default MovieShowcase;
