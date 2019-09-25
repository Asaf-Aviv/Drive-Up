import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
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
