import React from 'react'
import { NavLink as RouterNavLink } from 'react-router-dom'
import styled from 'styled-components'
import {
  Home,
  Movie,
  LiveTv,
  Person,
} from '@material-ui/icons'
import { NavLink } from 'components'

const links = [
  { to: '/', text: 'Home', icon: Home },
  { to: '/movies', text: 'Movies', icon: Movie },
  { to: '/shows', text: 'Shows', icon: LiveTv },
  { to: '/persons', text: 'Persons', icon: Person },
]

type Props = {
  onLinkClick?: () => void
  children: React.ReactNode
}

const Nav = ({ children, onLinkClick }: Props) => (
  <StyledNav>
    {links.map(({ to, text, icon: Icon }) => (
      <StyledNavLink
        exact
        as={RouterNavLink}
        activeClassName="active"
        key={to}
        to={to}
        onClick={onLinkClick}
      >
        {Icon && <Icon height={24} width={24} />}
        {text}
      </StyledNavLink>
    ))}
    {children}
  </StyledNav>
)

const StyledNavLink = styled(NavLink)`
  margin-bottom: 1rem;
  @media (min-width: 1100px) {
    margin-right: 1.5rem;
    margin-bottom: 0;
  }
`

const StyledNav = styled.nav`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media (min-width: 1100px) {
    flex-direction: row;
    align-items: center;
  }
`

export default Nav
