import React from 'react';
import styled from 'styled-components';
import { Video } from '../../store/movies/interfaces';

interface Videos {
  videos: Video[];
}

const Videos: React.FC<Videos> = ({ videos }) => (
  <>
    {videos.map(video => (
      <Iframe
        key={video.id}
        title={video.name}
        allowFullScreen
        src={`https://www.youtube.com/embed/${video.key}`}
      />
    ))}
  </>
);

const Iframe = styled.iframe`
  border: none;
  border-radius: 10px;
  width: 100%;
  min-height: 200px;
  height: 100%;
`;

export default Videos;
