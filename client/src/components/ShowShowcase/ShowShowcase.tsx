import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ShowShowcase as IShowShowcase } from '../../store/shows/interfaces';

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

const ShowShowcase: React.FC<IShowShowcase> = ({
  id,
  name,
  original_language,
  overview,
  poster_path,
  first_air_date,
}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper} elevation={5}>
      <Box display="flex">
        <Box display="inline-flex" flexBasis={185}>
          <img
            style={{ alignSelf: 'flex-start' }}
            src={`http://image.tmdb.org/t/p/w185/${poster_path}`}
            alt={name}
          />
        </Box>
        <Box padding={3} width="100%">
          <Box display="flex" alignItems="center">
            <Box flex={1} component="span" paddingRight={3} fontWeight={600}>
              {`First Air Date: ${new Date(first_air_date).toLocaleDateString()}`}
            </Box>
            <Link className={classes.link} to={`/show/${id}`}>
              <Typography
                variant="h5"
                component="h2"
                align="center"
                gutterBottom
              >
                {name}
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

export default ShowShowcase;
