import React from 'react';
import { makeStyles, Theme, Box } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: 1200,
    margin: '0 auto',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  paddingTop: {
    paddingTop: 80,
  },
}));

const Container: React.FC<{ paddingTop?: boolean }> = ({ children, paddingTop }) => {
  const classes = useStyles();

  return (
    <Box className={`${classes.root} ${paddingTop ? classes.paddingTop : ''}`}>
      {children}
    </Box>
  );
};

export default Container;
