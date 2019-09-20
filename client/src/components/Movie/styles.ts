import { makeStyles, ThemeProvider } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    textAlign: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
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
    backgroundColor: '#FFF',
  },
  tabsContainer: {
    margin: `0 auto ${theme.spacing(5)}px auto`,
  },
  movieList: {
    display: 'flex',
    flexDirection: 'column',
    '& .MuiListItem-root': {
      flex: 1,
    },
  },
  videosContainer: {
    display: 'grid',
    gridGap: theme.spacing(4),
    gridTemplateColumns: 'repeat(1, 1fr)',
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    '& iframe': {
      border: 'none',
      width: '100%',
      display: 'block',
      height: 300,
      [theme.breakpoints.between('sm', 'md')]: {
        height: 400,
      },
      [theme.breakpoints.up('md')]: {
        height: 340,
      },
    },
  },
}));

export default useStyles;
