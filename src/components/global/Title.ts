import styled from 'styled-components'

const Title = styled.h1<{ colored?: boolean }>`
  ${props => props.colored && `color: ${props.theme.colors.secondary}`};
  font-size: 1.5rem;
  margin: 2rem 0;
  text-align: center;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  line-height: 1.1;
  @media (min-width: 768px) {
    font-size: 2rem;
  }
  @media (min-width: 1400px) {
    font-size: 2.5rem;
  }
`

export default Title
