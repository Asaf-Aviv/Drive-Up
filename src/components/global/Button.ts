import styled from 'styled-components'

const Button = styled.button`
  position: relative;
  padding: 0.75rem 2rem;
  text-transform: uppercase;
  border: 3px solid ${props => props.theme.colors.primaryLight};
  background: transparent;
  color: #FFF;
  transition: background 250ms;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 3px 10px 3px rgb(23, 21, 21);
  &:hover {
    background: ${props => props.theme.colors.primaryLight};
  }
`

export default Button
