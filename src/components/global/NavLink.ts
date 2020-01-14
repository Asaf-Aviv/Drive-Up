import styled from 'styled-components'

const NavLink = styled.a`
  position: relative;
  padding: 0.5rem 0;
  color: #fff;
  display: inline-flex;
  align-items: center;
  font-size: 18px;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    transition: width 200ms;
    height: 2px;
    background: #FFF;
  }
  &:hover, &.active {
    &::after {
      width: 100%;
    }
  }
`

export default NavLink
