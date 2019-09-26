import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  paper: {
    marginBottom: 24,
    width: '100%',
    overflow: 'hidden',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  footerLink: {
    display: 'inline-block',
    marginLeft: 'auto',
    width: 150,
    '&:hover': {
      '& .MuiTypography-body1': {
        marginRight: 16,
      },
    },
    '& .MuiTypography-body1': {
      transition: 'margin-right 150ms',
      marginRight: 8,
    },
  },
  overview: {
    maxWidth: 650,
    textAlign: 'center',
    fontSize: '0.9em',
    flex: 1,
  },
});

export default useStyles;
