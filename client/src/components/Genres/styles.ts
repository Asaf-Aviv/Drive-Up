import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  buttonLink: {
    textDecoration: 'none',
    marginRight: 16,
  },
  genreGroup: {
    display: 'inline-block',
    '& .MuiButton-root': {
      marginRight: theme.spacing(2),
    },
  },
}));

export default useStyles;
