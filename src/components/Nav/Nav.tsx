import React from 'react'
import { NavLink as RouterNavLink } from 'react-router-dom'
import styled from 'styled-components'
import { ReactComponent as Home } from 'assets/icons/home.svg'
import { ReactComponent as Movies } from 'assets/icons/movies.svg'
import { ReactComponent as TV } from 'assets/icons/tv.svg'
import { ReactComponent as Persons } from 'assets/icons/people.svg'
import { NavLink } from 'components'

const links = [
  { to: '/', text: 'Home', icon: Home },
  { to: '/movies', text: 'Movies', icon: Movies },
  { to: '/shows', text: 'Shows', icon: TV },
  { to: '/persons', text: 'Persons', icon: Persons },
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
        {Icon && <Icon height={18} width={18} />}
        <span>{text}</span>
      </StyledNavLink>
    ))}
    {children}
  </StyledNav>
)

const StyledNavLink = styled(NavLink)`
  margin-bottom: 1rem;
  > span {
    margin-left: 0.5rem;
  }
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
