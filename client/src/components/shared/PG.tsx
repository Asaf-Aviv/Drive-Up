import React from 'react';
import styled from 'styled-components';
import { Certification } from '../../store/movies/interfaces';

interface PG {
  pg: Certification | undefined;
}

const PG: React.FC<PG> = ({ pg }) => {
  if (!pg) return null;

  return (
    <PGContainer>
      <span>{pg.certification}</span>
    </PGContainer>
  );
};

const PGContainer = styled.div`
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  box-shadow: 0px 3px 10px 3px rgb(23,21,21);
`;

export default PG;
