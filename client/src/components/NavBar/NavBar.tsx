import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

interface LinkProps {
  to: string;
  text: string;
}

const links: LinkProps[] = [
  { to: '/movies', text: 'Movies' },
  { to: '/shows', text: 'Shows' },
  { to: '/persons', text: 'Persons' },
  { to: '/Companies', text: 'Companies' },
];

const useStyles = makeStyles({
  link: {
    color: 'inherit',
    marginRight: '1em',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
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
      <Toolbar>
        {links.map(renderLinks)}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
