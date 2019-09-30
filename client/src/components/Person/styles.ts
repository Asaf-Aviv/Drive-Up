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
}));

export default useStyles;
