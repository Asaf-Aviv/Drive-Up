import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { getImgUrl } from '../../utils';

interface PersonCard {
  cast_id: number;
  character: string;
  credit_id: string;
  gender: 0 | 2 | 1;
  id: number;
  job: string;
  name: string;
  order: number;
  profile_path: string;
}

const PersonCard: React.FC<PersonCard> = ({
  id,
  name,
  profile_path,
}) => {
  if (!profile_path) return null;

  return (
    <Link to={`/person/${id}`}>
      <ImageContainer>
        <PersonName>{name}</PersonName>
        <LazyLoad>
          <PersonImage src={getImgUrl(profile_path, 154)} alt={name} />
        </LazyLoad>
      </ImageContainer>
    </Link>
  );
};

const PersonName = styled.h4`
  color: #FFF;
  text-align: center;
  margin-bottom: 1rem;
`;

const ImageContainer = styled.div`
  position: relative;
  border-radius: 50%;
  display: inline-block;
`;

const PersonImage = styled.img`
  user-select: none;
  display: block;
  transition: box-shadow 150ms;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.8);
  border-radius: 10%;
  &:hover {
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.8);
  }
`;

export default PersonCard;
