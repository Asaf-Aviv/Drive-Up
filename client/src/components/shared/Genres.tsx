import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { genreIdToString } from '../../utils';

interface Genres {
  genres: number[];
  mediaType: 'shows' | 'movies';
}

const Genres: React.FC<Genres> = ({ genres, mediaType }) => (
  <div>
    {genres.map(id => (
      <ButtonLink
        key={id}
        to={`/${mediaType}?with_genres=${id}`}
      >
        {genreIdToString(id)}
      </ButtonLink>
    ))}
  </div>
);

const ButtonLink = styled(Link)`
  user-select: none;
  color: ${({ theme }) => theme.textColors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  margin-right: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  text-decoration: none;
  display: inline-block;
  box-shadow: 0 2px 8px 1px #2f0000;
  transition: background-color 150ms;
  &:hover,
  &:active {
    background-color: ${({ theme }) => theme.colors.primary};
  }
  &:active {
    transform: translateY(1px);
  }
`;

export default Genres;
