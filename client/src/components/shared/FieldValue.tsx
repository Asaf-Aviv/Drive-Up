import React from 'react';
import styled from 'styled-components';

interface FieldValue {
  field: string;
  value: any;
  delimiter?: string;
}

const FieldValue: React.FC<FieldValue> = ({ field, value, delimiter = ':' }) => {
  if (!value) return null;

  return (
    <>
      <StyledSpan>{field}{delimiter}</StyledSpan>
      <span>{value}</span>
    </>
  );
};

const StyledSpan = styled.span`
  color: ${({ theme }) => theme.textColors.secondary};
  margin-right: 0.5rem;
`;

export default FieldValue;
