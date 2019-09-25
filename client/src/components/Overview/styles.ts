import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

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
  tabsContainer: {
    margin: `0 auto ${theme.spacing(5)}px auto`,
  },
}));

export default useStyles;
