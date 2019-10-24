import styled from 'styled-components';

const PersonsGrid = styled.div<{ columns: number; gutter: string }>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(154px, 1fr));
  grid-gap: ${props => props.gutter};
`;

export default PersonsGrid;
