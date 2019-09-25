import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link, Container } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

interface LinkProps {
  to: string;
  text: string;
}

const links: LinkProps[] = [
  { to: '/', text: 'Home' },
  { to: '/movies', text: 'Movies' },
  { to: '/shows', text: 'Shows' },
  { to: '/persons', text: 'Persons' },
  { to: '/companies', text: 'Companies' },
];

const useStyles = makeStyles({
  link: {
    color: 'inherit',
    marginRight: 24,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
    '& .MuiTypography-h6': {
      fontSize: 16,
    },
  },
  linkMenu: {
    '& .MuiList-root': {
      padding: 0,
      top: 65,
    },
    '& .MuiPaper-root': {
      overflow: 'hidden',
    },
  },
});

const NavBar = () => {
  const classes = useStyles();

  const renderLinks = ({ to, text }: LinkProps) => (
    <Link key={to} className={classes.link} to={to} component={RouterLink}>
      <Typography variant="h6" color="inherit">
        {text}
      </Typography>
    </Link>
  );

  return (
    <AppBar position="fixed" color="default">
      <Container>
        <Toolbar>
          {links.map(renderLinks)}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
