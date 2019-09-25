import React from 'react';
import { Box, Container, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Company } from '../../store/movies/interfaces';
import useStyles from './styles';

interface Companies {
  companies: Company[];
  title?: string;
}

const Companies: React.FC<Companies> = ({ companies, title = 'Companies' }) => {
  const classes = useStyles();

  if (!companies.length) return null;

  return (
    <Box className={classes.companiesContainer}>
      <Container>
        <Typography
          className={classes.companiesTitle}
          variant="h4"
        >
          {title}
        </Typography>
        <Box display="flex" py={8} alignItems="flex-start">
          {companies.map(
            ({ id, logo_path, name }) =>
              logo_path && (
                <Box key={id} flex={1} display="flex" justifyContent="center">
                  <Link to={`/company/${id}`}>
                    <img
                      height={64}
                      src={`https://image.tmdb.org/t/p/w300/${logo_path}`}
                      title={name}
                      alt={name}
                    />
                  </Link>
                </Box>
              )
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Companies;
