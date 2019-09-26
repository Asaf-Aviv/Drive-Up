import React from 'react';
import { Typography, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './styles';

interface CelebTile {
  id: number;
  name: string;
  image: string;
}

const CelebTile: React.FC<CelebTile> = ({ id, name, image }) => {
  const classes = useStyles();

  return (
    <Link to={`/person/${id}`} className={classes.celebTile}>
      <Typography
        color="secondary"
        variant="h5"
        align="center"
        gutterBottom
      >
        {name}
      </Typography>
      {image && (
        <Box overflow="hidden">
          <img
            className={classes.img}
            alt={name}
            src={`https://image.tmdb.org/t/p/w300/${image}`}
          />
        </Box>
      )}
    </Link>
  );
};

export default CelebTile;
