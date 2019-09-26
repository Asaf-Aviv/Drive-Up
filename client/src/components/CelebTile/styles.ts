import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  celebTile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '100%',
    textDecoration: 'none',
    '& .MuiTypography-root': {
      marginBottom: 'auto',
    },
    '& .MuiBox-root': {
      marginTop: theme.spacing(2),
      borderRadius: 6,
      boxShadow: theme.shadows['5'],
    },
    '&:hover img': {
      transform: 'scale(1.1)',
    },
  },
  img: {
    display: 'block',
    width: '100%',
    transition: '300ms',
    willChange: 'transform',
  },
}));

export default useStyles;
