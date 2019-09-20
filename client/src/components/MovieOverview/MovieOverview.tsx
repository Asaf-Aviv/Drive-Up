import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  makeStyles,
  Theme,
  Container,
  Box,
  Button,
  Typography,
} from '@material-ui/core';
import { Genre, Series, Company } from '../../store/moviesByIds/interfaces';

interface MovieOverview {
  backdrop_path: string | null;
  title: string;
  overview: string;
  genres: Genre[];
  series: Series | null;
  companies: Company[];
}

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    textAlign: 'center',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  generalInfo: {
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
    '& .MuiBox-root': {
      marginRight: theme.spacing(2),
    },
  },
  movieImage: {
    width: '100%',
    display: 'block',
  },
  overviewContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: `0 ${theme.spacing(2)}px`,
  },
  overview: {
    flex: 1,
  },
  genreGroup: {
    display: 'inline-block',
    '& .MuiButton-root': {
      marginRight: theme.spacing(2),
    },
  },
  companiesContainer: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    backgroundColor: '#FFF',
  },
  tabsContainer: {
    margin: `0 auto ${theme.spacing(5)}px auto`,
  },
  companiesTitle: {
    textAlign: 'center',
    color: '#232020',
    marginTop: theme.spacing(2),
  },
}));

const MovieOverview: React.FC<MovieOverview> = ({
  title,
  backdrop_path,
  overview,
  genres,
  series,
  companies,
}) => {
  const classes = useStyles();

  return (
    <>
      <Container>
        <Box display="flex" marginBottom={6}>
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
        <Box>
          {series && (
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
          )}
        </Box>
        <Box />
      </Container>
      <Box className={classes.companiesContainer}>
        <Container>
          <Typography
            className={classes.companiesTitle}
            variant="h4"
          >
            Companies
          </Typography>
          <Box display="flex" py={8} alignItems="flex-start">
            {companies.map(
              ({ id, logo_path, name }) =>
                logo_path && (
                  <Box key={id} flex={1} display="flex" justifyContent="center">
                    <RouterLink to={`/company/${id}`}>
                      <img
                        height={50}
                        src={`https://image.tmdb.org/t/p/original/${logo_path}`}
                        title={name}
                        alt={name}
                      />
                    </RouterLink>
                  </Box>
                )
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};


export default MovieOverview;
