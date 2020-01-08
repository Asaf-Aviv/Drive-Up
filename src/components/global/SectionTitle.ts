import styled from 'styled-components'

const SectionTitle = styled.h3<{ centered?: boolean }>`
  ${props => props.centered && 'text-align: center'};
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 500;
  @media (min-width: 768px) {
    font-size: 1.75rem;
  }
  @media (min-width: 1400px) {
    font-size: 2rem;
  }
`

export default SectionTitle
