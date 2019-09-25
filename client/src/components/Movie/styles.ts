import { makeStyles } from '@material-ui/styles';
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
  movieList: {
    display: 'flex',
    flexDirection: 'column',
    '& .MuiListItem-root': {
      flex: 1,
    },
  },
}));

export default useStyles;
