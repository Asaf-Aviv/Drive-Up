import React from 'react';
import { Box, Container } from '@material-ui/core';
import useStyles from './styles';
import { Video } from '../../store/movies/interfaces';

interface Videos {
  videos: Video[];
}

const Videos: React.FC<Videos> = ({ videos }) => {
  const classes = useStyles();

  return (
    <Container>
      <Box className={classes.videosContainer}>
        {videos.map(video => (
          <Box boxShadow={10} key={video.id}>
            <iframe
              title={video.name}
              allowFullScreen
              src={`https://www.youtube.com/embed/${video.key}`}
            />
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default Videos;
